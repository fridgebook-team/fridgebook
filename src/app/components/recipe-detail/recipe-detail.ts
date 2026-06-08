import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe';
import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetailComponent {
  readonly recipeId: string | null;
  readonly recipe: Recipe | undefined;
  shoppingListMessage = '';

  constructor(
    route: ActivatedRoute,
    recipeService: RecipeService,
    private readonly shoppingListService: ShoppingListService,
  ) {
    this.recipeId = route.snapshot.paramMap.get('id');
    this.recipe = recipeService.getRecipeById(Number(this.recipeId));
  }

  addMissingIngredientsToShoppingList() {
    if (!this.recipe || this.recipe.missingIngredients.length === 0) {
      this.shoppingListMessage = 'Keine fehlenden Zutaten zum Hinzufuegen.';
      return;
    }

    this.recipe.missingIngredients.forEach(ingredient =>
      this.shoppingListService.addItem(ingredient)
    );

    this.shoppingListMessage = `${this.recipe.missingIngredients.length} Zutaten wurden zur Einkaufsliste hinzugefuegt.`;
  }
}
