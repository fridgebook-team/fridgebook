import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FridgeService } from '../../services/fridge';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetailComponent implements OnInit {
  readonly recipeId: string | null;
  readonly recipe: Recipe | undefined;

  matchPercentage = 0;
  missingIngredients: string[] = [];
  showAddMessage = false;
  recipeCookedMessage = false;
  recipeIsCooked = false;
  currentServings = 2;

  constructor(
    route: ActivatedRoute,
    recipeService: RecipeService,
    private fridgeService: FridgeService,
    private shoppingListService: ShoppingListService,
    private cdr: ChangeDetectorRef
  ) {
    this.recipeId = route.snapshot.paramMap.get('id');
    this.recipe = recipeService.getRecipeById(Number(this.recipeId));
  }

  async ngOnInit() {
    await this.fridgeService.loadItems();

    if (this.recipe) {
      this.currentServings = parseInt(this.recipe.servings) || 2;
      this.calculateMatch();
    }

    this.cdr.detectChanges();
  }

  calculateMatch() {
    if (!this.recipe) return;

    const fridge = this.fridgeService.items.map(item => item.name.toLowerCase().trim());
    const recipeIngredients = this.recipe.ingredients.map(i => i.name.toLowerCase().trim());

    if (recipeIngredients.length === 0) {
      this.matchPercentage = 0;
      return;
    }

    let matched = 0;
    this.missingIngredients = [];

    recipeIngredients.forEach(ingredient => {
      const exists = fridge.some(fridgeItem =>
        fridgeItem.includes(ingredient) || ingredient.includes(fridgeItem)
      );

      if (exists) {
        matched++;
      } else {
        this.missingIngredients.push(ingredient);
      }
    });

    this.matchPercentage = Math.round((matched / recipeIngredients.length) * 100);
  }

  async addMissingToShoppingList() {
    await this.shoppingListService.loadItems();

    for (const ingredient of this.missingIngredients) {
      await this.shoppingListService.addItem(ingredient);
    }
    this.showAddMessage = true;
    this.cdr.detectChanges();
  }

  increaseServings() {
    this.currentServings++;
  }

  decreaseServings() {
    if (this.currentServings > 1) { this.currentServings--; }
  }

  getIngredientAmount(amount: string): string {
    if (!this.recipe) return amount;
    const originalServings = parseInt(this.recipe.servings) || 2;
    const numberMatch = amount.match(/[\d.]+/);

    if (!numberMatch) return amount;

    const originalNumber = parseFloat(numberMatch[0]);
    const scaledNumber = (originalNumber / originalServings) * this.currentServings;
    return amount.replace(numberMatch[0], scaledNumber.toString());
  }

  async recipeCooked() {
    if (!this.recipe) return;

    for (const ingredient of this.recipe.ingredients) {
      const amount = parseInt(ingredient.amount);
      if (isNaN(amount)) continue;

      const fridgeItem = this.fridgeService.items.find(item => {
        const fridgeName = item.name.toLowerCase();
        const ingredientName = ingredient.name.toLowerCase();
        return fridgeName.includes(ingredientName) || ingredientName.includes(fridgeName);
      });

      if (!fridgeItem) continue;

      fridgeItem.quantity -= amount;

      if (fridgeItem.quantity <= 0) {
        await this.fridgeService.removeItem(fridgeItem);
      } else {
        await this.fridgeService.updateItem(fridgeItem);
      }
    }

    this.recipeCookedMessage = true;
    this.recipeIsCooked = true;

    this.calculateMatch();
    this.cdr.detectChanges();

    await this.fridgeService.loadItems();
  }
}
