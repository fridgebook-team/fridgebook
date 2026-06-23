import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FridgeService } from '../../services/fridge';
import { ShoppingListService, ShoppingItem } from '../../services/shopping-list';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner';
import { ReceiptScanButtonComponent } from '../receipt-scan-button/receipt-scan-button';
import { BarcodeDraft } from '../../models/barcode.models';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, BarcodeScannerComponent, ReceiptScanButtonComponent],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList implements OnInit {
  statusMessage = '';

  constructor(
    private fridgeService: FridgeService,
    public shoppingListService: ShoppingListService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.shoppingListService.loadItems();
    this.cdr.detectChanges();
  }

  get items() {
    return this.shoppingListService.items;
  }

  async addItem(inputElement: HTMLInputElement) {
    const result = await this.shoppingListService.addItem(inputElement.value);

    if (result === 'duplicate') {
      this.statusMessage = 'Bereits vorhanden';
      this.cdr.detectChanges();
      setTimeout(() => { this.statusMessage = ''; this.cdr.detectChanges(); }, 2000);
      return;
    }

    inputElement.value = '';
    this.statusMessage = '';
    this.cdr.detectChanges();
  }

  async removeItem(item: ShoppingItem) {
    await this.shoppingListService.removeItem(item);
    this.cdr.detectChanges();
  }

  onProductScanned(draft: BarcodeDraft) {
    this.fridgeService.addItem({
      name: draft.name,
      quantity: draft.quantity,
      unit: draft.unit,
    });

    const fuse = new Fuse(this.items, { keys: ['name'], threshold: 0.35, includeScore: true });
    const results = fuse.search(draft.name);
    if (results.length > 0 && (results[0].score ?? 1) < 0.35) {
      this.shoppingListService.removeItem(results[0].item);
    }

    this.statusMessage = `${draft.name} wurde dem Kuehlschrank hinzugefuegt.`;
    this.cdr.detectChanges();
    setTimeout(() => { this.statusMessage = ''; this.cdr.detectChanges(); }, 3000);
  }

  onStatusChange(message: string) {
    this.statusMessage = message;
    this.cdr.detectChanges();
  }
}
