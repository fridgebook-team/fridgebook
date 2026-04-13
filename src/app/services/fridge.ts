import { Injectable } from '@angular/core';

export interface FridgeItem {
  name: string;
  quantity: number;
  unit: string;
  expiry?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FridgeService {

  items: FridgeItem[] = [
    { name: '🥛 Milk', quantity: 1, unit: 'liter', expiry: '2026-03-28' },
    { name: '🧀 Cheese', quantity: 200, unit: 'g', expiry: '2026-04-15' },
    { name: '🥚 Eggs', quantity: 6, unit: 'pieces', expiry: '2026-04-10' },
    { name: '🥬 Lettuce', quantity: 1, unit: 'head', expiry: '2026-03-25' },
    { name: '🍅 Tomatoes', quantity: 4, unit: 'pieces', expiry: '2026-03-27' }
  ];

  addItem(item: FridgeItem) {
    const existing = this.items.find(i =>
      i.name.toLowerCase() === item.name.toLowerCase()
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(item: FridgeItem) {
    this.items = this.items.filter(i => i !== item);
  }
}