import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Searchbar } from '../searchbar/searchbar';
import { PopularRecipes } from "../popular-recipes/popular-recipes";
import { Recipe } from '../../models/recipe.models';

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

  recipes: Recipe[] = [
    { id: 0, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '15 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 75, borderColor: '#4A5D23' },
    { id: 1, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: false, isVeggie: false, isFavorite: true, matchPercentage: 15, borderColor: '#a12424' },
    { id: 2, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '60 Min', isVegan: false, isVeggie: true, isFavorite: false, matchPercentage: 50, borderColor: '#b38728' },
    { id: 3, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '90 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 90, borderColor: '#4A5D23' },
    { id: 4, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: false, isVeggie: false, isFavorite: false, matchPercentage: 75, borderColor: '#4A5D23' },
    { id: 5, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 75, borderColor: '#4A5D23' },
    { id: 6, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: false, isVeggie: true, isFavorite: true, matchPercentage: 75, borderColor: '#4A5D23' },
  ];
}
