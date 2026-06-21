import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Recipe } from '../models/recipe';
import { FridgeItem, FridgeService } from './fridge';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly storageKey = 'fridgebook.generatedRecipes';
  private recipes: Recipe[] = this.loadStoredRecipes();

  constructor(
    private readonly http: HttpClient,
    private readonly fridgeService: FridgeService,
  ) {}

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  async generateRecipesFromFridge(): Promise<Recipe[]> {
    const fridgeItems = this.fridgeService.items;

    if (fridgeItems.length === 0) {
      this.recipes = [];
      this.saveRecipes();
      return this.recipes;
    }

    const response: any = await firstValueFrom(
      this.http.post(
        '/api/groq/openai/v1/chat/completions',
        this.buildRequestBody(fridgeItems),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const content = response.choices?.[0]?.message?.content ?? '';
    this.recipes = this.normalizeRecipes(this.parseJson(content));

    if (this.recipes.length === 0) {
      throw new Error('Die KI hat keine verwertbaren Rezepte zurueckgegeben. Bitte versuche es nochmal.');
    }

    this.saveRecipes();

    return this.recipes;
  }

  private buildRequestBody(fridgeItems: FridgeItem[]) {
    const ingredients = fridgeItems.map((item) => ({
      name: this.cleanIngredientName(item.name),
      quantity: item.quantity,
      unit: item.unit,
      expiry: item.expiry ?? null,
    }));

    return {
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'system',
          content:
            'Du generierst Rezeptvorschlaege fuer eine Kuehlschrank-App. Antworte ausschliesslich mit gueltigem JSON ohne Markdown.',
        },
        {
          role: 'user',
          content: `Analysiere diese vorhandenen Lebensmittel: ${JSON.stringify(ingredients)}.
Erstelle 5 realistische Rezepte auf Deutsch.
Sortiere sie nach hoechster Uebereinstimmung mit vorhandenen Zutaten.
Berechne matchPercentage als Anteil vorhandener Hauptzutaten an allen benoetigten Hauptzutaten.
Nutze moeglichst viele vorhandene Zutaten und vermeide Rezepte mit vielen fehlenden Spezialzutaten.
Antworte ausschliesslich als JSON-Array.
Jedes Objekt hat exakt diese Felder:
{
  "name": "string",
  "subtitle": "string",
  "time": "string, z.B. 25 Min",
  "difficulty": "Einfach | Mittel | Schwer",
  "servings": "string, z.B. 2 Portionen",
  "isVegan": boolean,
  "matchPercentage": number,
  "description": "string",
  "tags": ["string"],
  "matchedIngredients": ["string"],
  "missingIngredients": ["string"],
  "ingredients": [{"amount":"string","name":"string"}],
  "steps": [{"title":"string","description":"string"}],
  "tips": [{"icon":"bi bi-lightbulb-fill","text":"string"}]
}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 3000,
    };
  }

  private parseJson(text: string): unknown[] {
    const clean = text
      .replace(/```json|```/g, '')
      .trim();

    const parsed = this.safeJsonParse(clean) ?? this.safeJsonParse(this.extractJson(clean));

    if (Array.isArray(parsed)) {
      return parsed;
    }

    if (this.hasRecipeArray(parsed)) {
      return parsed.recipes;
    }

    return [];
  }

  private safeJsonParse(text: string): unknown | undefined {
    try {
      return JSON.parse(text);
    } catch {
      return undefined;
    }
  }

  private extractJson(text: string): string {
    const arrayStart = text.indexOf('[');
    const arrayEnd = text.lastIndexOf(']');
    const objectStart = text.indexOf('{');
    const objectEnd = text.lastIndexOf('}');

    if (arrayStart !== -1 && arrayEnd > arrayStart) {
      return text.slice(arrayStart, arrayEnd + 1);
    }

    if (objectStart !== -1 && objectEnd > objectStart) {
      return text.slice(objectStart, objectEnd + 1);
    }

    return text;
  }

  private hasRecipeArray(value: unknown): value is { recipes: unknown[] } {
    return (
      typeof value === 'object' &&
      value !== null &&
      'recipes' in value &&
      Array.isArray((value as { recipes: unknown }).recipes)
    );
  }

  private normalizeRecipes(rawRecipes: unknown[]): Recipe[] {
    return rawRecipes
      .map((rawRecipe, index) => this.normalizeRecipe(rawRecipe, index))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  private normalizeRecipe(rawRecipe: unknown, index: number): Recipe {
    const recipe = rawRecipe as Partial<Recipe>;
    const matchPercentage = this.toNumber(recipe.matchPercentage);

    return {
      id: index,
      name: recipe.name ?? `Rezept ${index + 1}`,
      subtitle: recipe.subtitle ?? 'KI-Vorschlag aus deinem Kuehlschrank.',
      image: 'images/recipes/ravioli.jpg',
      time: recipe.time ?? '30 Min',
      difficulty: recipe.difficulty ?? 'Einfach',
      servings: recipe.servings ?? '2 Portionen',
      isVegan: Boolean(recipe.isVegan),
      isFavorite: false,
      matchPercentage,
      borderColor: this.getMatchColor(matchPercentage),
      description: recipe.description ?? '',
      tags: Array.isArray(recipe.tags) ? recipe.tags : [],
      matchedIngredients: Array.isArray(recipe.matchedIngredients) ? recipe.matchedIngredients : [],
      missingIngredients: Array.isArray(recipe.missingIngredients) ? recipe.missingIngredients : [],
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      steps: Array.isArray(recipe.steps) ? recipe.steps : [],
      tips: Array.isArray(recipe.tips) ? recipe.tips : [],
    };
  }

  private toNumber(value: unknown): number {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? Math.max(0, Math.min(100, numberValue)) : 0;
  }

  private getMatchColor(matchPercentage: number): string {
    if (matchPercentage >= 75) {
      return '#4A5D23';
    }

    if (matchPercentage >= 45) {
      return '#b38728';
    }

    return '#a12424';
  }

  private cleanIngredientName(name: string): string {
    return name.replace(/[^\p{L}\p{N}\s-]/gu, '').trim();
  }

  private loadStoredRecipes(): Recipe[] {
    const storedRecipes = localStorage.getItem(this.storageKey);
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  }

  private saveRecipes() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.recipes));
  }
}
