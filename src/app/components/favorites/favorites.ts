import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe';


@Component({
  selector: 'app-favorites',
  imports: [CommonModule, Icon, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  selectedTime: string = '30 min.';
  veganFilterOn: boolean = false;

  filteredRecipes: Recipe[] = [];
  recipes: Recipe[] = [];

  constructor(private readonly recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.applyFilters();
  }

  setTimeFilter(time: string) {
    this.selectedTime = time;
    this.applyFilters();
  }

  toggleVegan() {
    this.veganFilterOn = !this.veganFilterOn;
    this.applyFilters();
  }

  applyFilters() {
    const timeLimit = parseInt(this.selectedTime);

    this.filteredRecipes = this.recipes.filter(recipe => {
      const recipeTime = parseInt(recipe.time);
      const matchesTime = recipeTime <= timeLimit;

      const matchesVegan = this.veganFilterOn ? recipe.isVegan : true;

      return matchesTime && matchesVegan;
    });
  }

  toggleFavorite(recipe: Recipe) {
    recipe.isFavorite = !recipe.isFavorite;

    this.applyFilters();
  }


}
