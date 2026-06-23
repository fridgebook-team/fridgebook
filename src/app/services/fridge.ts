import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { FridgeItem } from '../models/fridge.models';

export type { FridgeItem };

@Injectable({
  providedIn: 'root',
})
export class FridgeService {

  items: FridgeItem[] = [];

  constructor(private db: DbService) {}

  //Alles laden
  async loadItems() {
    this.items = await this.db.getAll("lebensmittel");
   //console.log("fridge service: items after load:", this.items);
  }

  // Hinzufügen
  async addItem(item: Omit<FridgeItem, 'id' | 'addedAt'>) {
    console.log("fridge shopping-list: addItem:", item);

    const newItem: FridgeItem = {
      ...item,
      addedAt: new Date().toISOString() // hinzugefügt am
    };

    const existing = this.items.find(i =>
      i.name.toLowerCase() === item.name.toLowerCase()
    );

    if (existing) {
      existing.quantity += item.quantity;
      await this.updateItem(existing);
    } else {
      await this.db.add("lebensmittel", newItem);
    }

    await this.loadItems();
  }

  // Updaten
  async updateItem(item: FridgeItem) {
    await this.db.update("lebensmittel", item);
    await this.loadItems(); // reload damit UI stimmt
  }

  // Löschen
  async removeItem(item: FridgeItem) {
    await this.db.delete("lebensmittel", item.id!);
    await this.loadItems();
  }
}