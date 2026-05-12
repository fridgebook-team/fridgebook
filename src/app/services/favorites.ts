import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  favoriteIds: number[] = [];

  constructor(private db: DbService) {}

  async loadFavorites() {
    const data = await this.db.getAll("favorites");
    this.favoriteIds = data.map((f: any) => f.id);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds.includes(id);
  }

  async toggleFavorite(id: number) {
    const exists = this.favoriteIds.includes(id);

    if (exists) {
      await this.db.delete("favorites", id);
    } else {
      await this.db.add("favorites", { id });
    }

    await this.loadFavorites();
  }
}