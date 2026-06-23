import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FridgeService, FridgeItem } from '../../services/fridge';
import { ViewChild } from '@angular/core';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner';
import { ReceiptScanButtonComponent } from '../receipt-scan-button/receipt-scan-button';
import { BarcodeDraft } from '../../models/barcode.models';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-fridge-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fridge-list.html',
  styleUrls: ['./fridge-list.css']
})
export class FridgeListComponent implements OnInit {
  searchTerm: string = '';
  currentSort: 'name' | 'quantity' | 'expiry' = 'name';

  showAddModal = false;
  newItem = { name: '', quantity: 1, unit: 'Stk', expiry: '' };

  constructor(
    public fridgeService: FridgeService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.fridgeService.loadItems();
    this.cdr.detectChanges(); // UI update
  }

  get items() {
    return this.fridgeService.items;
  }

  get filteredItems() {
    let list = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.currentSort === 'name') {
      list.sort((a, b) => {
        const nameA = a.name.replace(/[\u1000-\uFFFF]+/g, '').trim().toLowerCase();
        const nameB = b.name.replace(/[\u1000-\uFFFF]+/g, '').trim().toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (this.currentSort === 'quantity') {
      list.sort((a, b) => b.quantity - a.quantity);
    } else if (this.currentSort === 'expiry') {
      list.sort((a, b) => new Date(a.expiry || '').getTime() - new Date(b.expiry || '').getTime());
    }
    return list;
  }

  setSort(type: 'name' | 'quantity' | 'expiry') {
    this.currentSort = type;
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
  }

  openAddModal() {
    this.newItem = { name: '', quantity: 1, unit: 'Stk', expiry: '' };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  async submitNewItem() {
    if (!this.newItem.name || !this.newItem.quantity) return;
    await this.fridgeService.addItem({
      name: this.newItem.name.trim(),
      quantity: this.newItem.quantity,
      unit: this.newItem.unit,
      expiry: this.newItem.expiry || undefined,
    });
    this.showAddModal = false;
    this.cdr.detectChanges();
  }

  async removeItem(item: FridgeItem) {
    await this.fridgeService.removeItem(item);
    this.cdr.detectChanges(); // UI update
  }

  async increaseQuantity(item: FridgeItem) {
    const step = (item.unit === 'g' || item.unit === 'ml') ? 10 : 1;
    item.quantity += step;

    await this.fridgeService.updateItem(item); // WICHTIG DB sync
    this.cdr.detectChanges();
  }

  async decreaseQuantity(item: FridgeItem) {
    const step = (item.unit === 'g' || item.unit === 'ml') ? 10 : 1;

    if (item.quantity > step) {
      item.quantity -= step;
      await this.fridgeService.updateItem(item);
    } else {
      await this.fridgeService.removeItem(item);
    }
    this.cdr.detectChanges();
  }
}