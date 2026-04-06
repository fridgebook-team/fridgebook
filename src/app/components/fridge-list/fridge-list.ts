import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FridgeItem {
  name: string;
  quantity: number;
  unit: string;
  expiry?: string;
}

@Component({
  selector: 'app-fridge-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fridge-list.html',
  styleUrls: ['./fridge-list.css']
})
export class FridgeListComponent {
  searchTerm: string = '';
  currentSort: 'name' | 'quantity' | 'expiry' = 'name';


  items: FridgeItem[] = [
    { name: '🥛 Milk', quantity: 1, unit: 'liter', expiry: '2026-03-28' },
    { name: '🧀 Cheese', quantity: 200, unit: 'g', expiry: '2026-04-15' },
    { name: '🥚 Eggs', quantity: 6, unit: 'pieces', expiry: '2026-04-10' },
    { name: '🥬 Lettuce', quantity: 1, unit: 'head', expiry: '2026-03-25' },
    { name: '🍅 Tomatoes', quantity: 4, unit: 'pieces', expiry: '2026-03-27' }
  ];

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
    }
    else if (this.currentSort === 'quantity') {
      list.sort((a, b) => b.quantity - a.quantity);
    }
    else if (this.currentSort === 'expiry') {
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

  //remove item from shopping list
  removeItem(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  increaseQuantity(item: FridgeItem) {
    const step = (item.unit === 'g' || item.unit === 'ml') ? 10 : 1;
    item.quantity += step;
  }

  decreaseQuantity(item: FridgeItem) {
    const step = (item.unit === 'g' || item.unit === 'ml') ? 10 : 1;

    if (item.quantity > step) {
      item.quantity -= step;
    } else {
      this.removeItem(item);
    }
  }
}