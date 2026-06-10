import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { ShoppingItem } from '../models/shopping.models';

export type { ShoppingItem };

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  items: ShoppingItem[] = [];

  constructor(private db: DbService) {}

  async loadItems() {
    this.items = await this.db.getAll("einkaufsliste");
  }

  async addItem(name: string, quantity = 1, unit = 'Stk') {
    const normalized = name.trim().toLowerCase();

    const existing = this.items.find(i => i.name.toLowerCase() === normalized);
    if (existing) return 'duplicate';

    await this.db.add("einkaufsliste", { name: name.trim(), quantity, unit });
    await this.loadItems();
    return 'ok';
  }

  async updateItem(item: ShoppingItem) {
    await this.db.update("einkaufsliste", item);
    await this.loadItems();
  }

  async removeItem(item: ShoppingItem) {
    await this.db.delete("einkaufsliste", item.id!);
    await this.loadItems();
  }

  removeByName(name: string) {
    const normalized = name.trim().toLowerCase();
    this.items = this.items.filter(i => i.name.trim().toLowerCase() !== normalized);
  }
}
