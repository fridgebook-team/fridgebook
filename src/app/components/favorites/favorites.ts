import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
import { FridgeService } from '../../services/fridge';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';
import { RECIPES } from '../../services/recipes.data';


@Component({
  selector: 'app-favorites',
  imports: [CommonModule, Icon, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  selectedTime: string = '30 min.';
  veganFilterOn: boolean = false;
  veggieFilterOn: boolean = false;

  constructor(
    public favoritesService: FavoritesService,
    private fridgeService: FridgeService,
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {}

  filteredRecipes: Recipe[] = [];
  recipes: Recipe[] = RECIPES;

  async ngOnInit() {
    await this.favoritesService.loadFavorites();
    await this.fridgeService.loadItems();
    //this.recipes = this.recipeService.getRecipes();

    const savedTime = localStorage.getItem('favoritesTimeFilter');
    if (savedTime) {
      this.selectedTime = savedTime;
    }

    this.veganFilterOn = document.documentElement.classList.contains('vegan') || false;
    this.veggieFilterOn = document.documentElement.classList.contains('veggie') || false;

    this.filteredRecipes = [...this.recipes];
    this.applyFilters();
    this.cdr.detectChanges();
    /*console.log('RECIPES:', this.recipes);
    console.log('FAVORITES:', this.favoritesService.favoriteIds);
    console.log('FILTERED:', this.filteredRecipes);*/
  }

  setTimeFilter(time: string) {
    this.selectedTime = time;
    localStorage.setItem('favoritesTimeFilter', time);
    this.applyFilters();
  }

  toggleVeggie() {
    this.veganFilterOn = false;
    document.documentElement.classList.remove('vegan');
    this.veggieFilterOn = !this.veggieFilterOn;
    document.documentElement.classList.toggle('veggie', this.veggieFilterOn);
    this.applyFilters();
  }

  toggleVegan() {
    this.veggieFilterOn = false;
    document.documentElement.classList.remove('veggie');
    this.veganFilterOn = !this.veganFilterOn;
    document.documentElement.classList.toggle('vegan', this.veganFilterOn);
    this.applyFilters();
  }

  async toggleFavorite(recipe: Recipe) {
    await this.favoritesService.toggleFavorite(recipe.id);
    await this.favoritesService.loadFavorites();
    this.applyFilters();
    this.cdr.detectChanges();
  }

  applyFilters() {
    this.recipes.forEach(recipe => {
      recipe.matchPercentage = this.calculateMatch(recipe);

      if (recipe.matchPercentage >= 70) {
        recipe.borderColor = '#4A5D23';
      } else if (recipe.matchPercentage >= 40) {
        recipe.borderColor = '#b38728';
      } else {
        recipe.borderColor = '#a12424';
      }
    });

    const timeLimit = parseInt(this.selectedTime);
    const favIds = this.favoritesService.favoriteIds;

    this.filteredRecipes = this.recipes.filter(recipe => {
      const isFavorite = favIds.includes(recipe.id);
      if (!isFavorite) return false;

      const recipeTime = parseInt(recipe.time);
      const matchesTime = recipeTime <= timeLimit;
      const matchesVegan = this.veganFilterOn ? recipe.isVegan : true;
      const matchesVeggie = this.veggieFilterOn ? (recipe.isVeggie ?? false) : true;

      return matchesTime && matchesVegan && matchesVeggie;
    });
  }

  calculateMatch(recipe: Recipe): number {
    const fridgeNames = this.fridgeService.items.map(item =>
      item.name.toLowerCase().trim()
    );

    const ingredients = recipe.ingredients.map(i => i.name);
    if (ingredients.length === 0) {
      return 0;
    }

    const matches = ingredients.filter(ingredient => {
      const ing = ingredient.toLowerCase().trim();
      return fridgeNames.some(fridge => fridge.includes(ing) || ing.includes(fridge));
    }).length;

    return ingredients.length === 0 ? 0 : Math.round(matches / ingredients.length * 100);
  }
}
