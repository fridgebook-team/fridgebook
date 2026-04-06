import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  imports: [],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList {

  items = [
    { name: 'Banane' },
    { name: 'Apfel' },
  ];

  //add item to shopping list
  addItem(inputElement: HTMLInputElement) {
    const itemName = inputElement.value.trim();

    if (itemName) {
      this.items.push({ name: itemName });
      inputElement.value = '';
    }
  }

  //remove item from shopping list
  removeItem(item: any) {
    this.items = this.items.filter(i => i !== item);
  }
}
