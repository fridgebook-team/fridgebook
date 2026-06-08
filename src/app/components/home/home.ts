import { Component } from '@angular/core';
import { BrandStamp } from '../brand-stamp/brand-stamp';
import { Gallery, Recipe } from '../gallery/gallery';

@Component({
  selector: 'app-home',
  imports: [BrandStamp, Gallery],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  recipes: Recipe[] = [
    { id: 0, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '15 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 75, borderColor: '#4A5D23' },
    { id: 1, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: false, isVeggie: false, isFavorite: true, matchPercentage: 15, borderColor: '#a12424' },
    { id: 2, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '60 Min', isVegan: false, isVeggie: true, isFavorite: false, matchPercentage: 50, borderColor: '#b38728' },
    { id: 3, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '90 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 90, borderColor: '#4A5D23' },
    { id: 4, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: false, isVeggie: false, isFavorite: false, matchPercentage: 75, borderColor: '#4A5D23' },
    { id: 5, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: true, isVeggie: true, isFavorite: true, matchPercentage: 75, borderColor: '#4A5D23' },
    { id: 6, name: 'Creamy Tuscan Ravioli', image: 'images/recipes/ravioli.jpg', time: '30 Min', isVegan: false, isVeggie: true, isFavorite: true, matchPercentage: 75, borderColor: '#4A5D23' },
  ];

  get favoriteRecipes(): Recipe[] {
    return this.recipes.filter(r => r.isFavorite);
  }
}
