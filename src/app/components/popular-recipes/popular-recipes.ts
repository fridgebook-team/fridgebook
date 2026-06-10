import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.models';

@Component({
  selector: 'app-popular-recipes',
  imports: [CommonModule, RouterLink],
  templateUrl: './popular-recipes.html',
  styleUrl: './popular-recipes.css',
})
export class PopularRecipes {
  recipes: Recipe[] = [
    { id: 0, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '15 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 75, borderColor: '#4A5D23' },
    { id: 1, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: false, isVeggie: false, isFavorite: true, matchPercentage: 15, borderColor: '#a12424' },
    { id: 2, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '60 Min', isVegan: false, isVeggie: true, isFavorite: false, matchPercentage: 50, borderColor: '#b38728' },
    { id: 3, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '90 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 90, borderColor: '#4A5D23' },
  ];
}
