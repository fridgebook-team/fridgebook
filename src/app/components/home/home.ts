import { Component } from '@angular/core';
import { BrandStamp } from '../brand-stamp/brand-stamp';
import { Gallery } from '../gallery/gallery';
import { Recipe } from '../../models/recipe';
import { RECIPES } from '../../services/recipes.data';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-home',
  imports: [BrandStamp, Gallery],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  recipes: Recipe[] = RECIPES;

  constructor(public favoritesService: FavoritesService) {}

  get favoriteRecipes(): Recipe[] {
    const favIds = this.favoritesService.favoriteIds;
    return this.recipes.filter(r => favIds.includes(r.id));
  }
}