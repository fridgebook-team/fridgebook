import { Injectable } from '@angular/core';
import { DbService } from './db.service';

export interface FridgeItem {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
  expiry?: string;
  addedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class FridgeService {

  items: FridgeItem[] = [];

  constructor(private db: DbService) {
    this.loadItems();
  }

  async loadItems() {
    this.items = await this.db.getAll("lebensmittel");
  }

  async refresh() {
    this.items = await this.db.getAll("lebensmittel");
  }

  async addItem(item: Omit<FridgeItem, 'id' | 'addedAt'>) {

    const newItem: FridgeItem = {
      ...item,
      addedAt: new Date().toISOString() // hinzugefügt am
    };

    // Einfügen
    await this.db.add("lebensmittel", newItem).then((id) => {
      this.items.push({ ...newItem, id });
    });

    await this.refresh();
  }

  /*addItem(item: FridgeItem) {
    const existing = this.items.find(i =>
      i.name.toLowerCase() === item.name.toLowerCase()
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }*/

  // Löschen
  async removeItem(item: FridgeItem) {
    this.db.delete("lebensmittel", item.id!).then(() => {
      this.items = this.items.filter(i => i.id !== item.id);
    });
    
    await this.refresh();
  }
}