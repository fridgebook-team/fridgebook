import { Injectable } from '@angular/core';
import { DbService } from './db.service';

export interface ShoppingItem {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  items: ShoppingItem[] = [];

  constructor(private db: DbService) {}

  async loadItems() {
    console.log("3: loadItems()");
    this.items = await this.db.getAll("einkaufsliste");
    console.log("3: items after load:", this.items);
  }

  //Hinzufügen
  async addItem(name: string) {
    console.log("service shopping-list: addItem:", name);
    const normalized = name.trim().toLowerCase();
    
    const existing = this.items.find(
      i => i.name.toLowerCase() === normalized
    );

    if (existing) {
      console.log("duplicate blocked"); //irgendwie für user zeigen
      return 'duplicate'; //keine Duplikate - ‘duplicate‘ für component
    }

    await this.db.add("einkaufsliste", { name });
    await this.loadItems(); //lödt db neu mit neuem Item

    return 'ok';
  }

  //Entfernen
  async removeItem(item: ShoppingItem) {
    await this.db.delete("einkaufsliste", item.id!);
    await this.loadItems(); //lödt db neu ohne entferntes Item
  }
}