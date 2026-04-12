import { Injectable } from '@angular/core';

export interface ShoppingItem {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  items: ShoppingItem[] = [
    { name: 'Banane' },
    { name: 'Apfel' },
    { name: 'Kopfsalat' },
    { name: 'Milch' },
  ];

  addItem(name: string) {
    if (name.trim()) {
      this.items.push({ name: name.trim() });
    }
  }

  removeItem(item: ShoppingItem) {
    this.items = this.items.filter(i => i !== item);
  }
}