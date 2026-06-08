import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-popular-recipes',
  imports: [CommonModule, RouterLink],
  templateUrl: './popular-recipes.html',
  styleUrl: './popular-recipes.css',
})
export class PopularRecipes implements OnInit {
  recipes: Recipe[] = [];
  isLoading = false;
  errorMessage = '';
  hasRequestedRecipes = false;

  constructor(private readonly recipeService: RecipeService) {}

  async ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    if (this.recipes.length === 0) {
      await this.generateRecipes();
    }
  }

  async generateRecipes() {
    this.isLoading = true;
    this.errorMessage = '';
    this.hasRequestedRecipes = true;

    try {
      this.recipes = await this.recipeService.generateRecipesFromFridge();
    } catch (error) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return 'Groq lehnt den Request ab. Pruefe, ob GROQ_API_KEY korrekt gesetzt ist.';
      }

      if (error.status === 0) {
        return 'Groq konnte nicht erreicht werden. Laeuft der Dev-Server mit Proxy und Internetverbindung?';
      }

      return `Groq-Fehler ${error.status}: Rezepte konnten nicht generiert werden.`;
    }

    if (error instanceof SyntaxError) {
      return 'Die KI-Antwort war kein gueltiges JSON. Bitte versuche es nochmal.';
    }

    return error instanceof Error ? error.message : 'Rezepte konnten nicht generiert werden.';
  }

  clickPop(rezeptname : string) {
    console.log(rezeptname + 'wurde geclickt');
  }
}
