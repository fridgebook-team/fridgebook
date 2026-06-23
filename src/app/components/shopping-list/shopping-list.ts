import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FridgeService } from '../../services/fridge';
import { ShoppingListService, ShoppingItem } from '../../services/shopping-list';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner';
import { ReceiptScanButtonComponent } from '../receipt-scan-button/receipt-scan-button';
import { BarcodeDraft } from '../../models/barcode.models';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BarcodeScannerComponent, ReceiptScanButtonComponent],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList implements OnInit {
  @ViewChild('barcodeScanner') barcodeScannerRef!: BarcodeScannerComponent;

  statusMessage = '';
  showAddSheet = false;
  newItem = { name: '', quantity: 1, unit: 'Stk' };
  readonly unitOptions = ['Stk', 'g', 'kg', 'ml', 'L', 'EL', 'TL'];

  constructor(
    private fridgeService: FridgeService,
    public shoppingListService: ShoppingListService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.shoppingListService.loadItems();
    this.cdr.detectChanges();
  }

  get items() { return this.shoppingListService.items; }

  openAddSheet() {
    this.newItem = { name: '', quantity: 1, unit: 'Stk' };
    this.showAddSheet = true;
  }

  closeAddSheet() { this.showAddSheet = false; }

  openBarcode() {
    this.closeAddSheet();
    this.barcodeScannerRef.open();
  }

  async submitNewItem() {
    if (!this.newItem.name.trim()) return;
    const result = await this.shoppingListService.addItem(
      this.newItem.name, this.newItem.quantity, this.newItem.unit
    );
    if (result === 'duplicate') {
      this.statusMessage = 'Bereits vorhanden';
      setTimeout(() => { this.statusMessage = ''; this.cdr.detectChanges(); }, 2000);
    } else {
      this.showAddSheet = false;
    }
    this.cdr.detectChanges();
  }

  async increaseQuantity(item: ShoppingItem) {
    const step = (item.unit === 'g' || item.unit === 'ml') ? 10 : 1;
    await this.shoppingListService.updateItem({ ...item, quantity: item.quantity + step });
    this.cdr.detectChanges();
  }

  async decreaseQuantity(item: ShoppingItem) {
    const step = (item.unit === 'g' || item.unit === 'ml') ? 10 : 1;
    if (item.quantity > step) {
      await this.shoppingListService.updateItem({ ...item, quantity: item.quantity - step });
    } else {
      await this.shoppingListService.removeItem(item);
    }
    this.cdr.detectChanges();
  }

  moveMessage: string = '';

  async removeItem(item: ShoppingItem) {
    const existing = this.fridgeService.items.find(i => i.name === item.name);

    if (existing) {
      existing.quantity += item.quantity ?? 1;
      await this.fridgeService.updateItem(existing);
    } else {
      await this.fridgeService.addItem({
      name: item.name,
      quantity: item.quantity ?? 1,
      unit: item.unit ?? 'Stk',
      expiry: undefined
    });
    }

    await this.shoppingListService.removeItem(item);

    this.moveMessage = 'Artikel wurde in Ihre virtuelle Speisekammer verschoben!';
    this.cdr.detectChanges();
    setTimeout(() => { this.moveMessage = ''; }, 2500);
    
    this.cdr.detectChanges();
  }

  onProductScanned(draft: BarcodeDraft) {
    this.fridgeService.addItem({ name: draft.name, quantity: draft.quantity, unit: draft.unit });
    const fuse = new Fuse(this.items, { keys: ['name'], threshold: 0.35, includeScore: true });
    const results = fuse.search(draft.name);
    if (results.length > 0 && (results[0].score ?? 1) < 0.35) {
      this.shoppingListService.removeItem(results[0].item);
    }
    this.statusMessage = `${draft.name} wurde dem Kühlschrank hinzugefügt.`;
    this.cdr.detectChanges();
    setTimeout(() => { this.statusMessage = ''; this.cdr.detectChanges(); }, 3000);
  }

  onStatusChange(message: string) {
    this.statusMessage = message;
    this.cdr.detectChanges();
  }
}
