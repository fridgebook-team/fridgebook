import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Searchbar } from '../searchbar/searchbar';
import { PopularRecipes } from "../popular-recipes/popular-recipes";
import { Recipe } from '../../models/recipe';
import { RECIPES } from '../../services/recipes.data';

@Component({
  selector: 'app-explore-page',
  imports: [Searchbar, PopularRecipes, CommonModule, RouterLink],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.css',
})
export class ExplorePage {
  searchTerm = '';

  get filteredRecipes(): Recipe[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return [];
    return this.recipes.filter(r => r.name.toLowerCase().includes(term));
  }

  recipes: Recipe[] = RECIPES;

}
