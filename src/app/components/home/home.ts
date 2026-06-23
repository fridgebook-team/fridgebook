import { Component } from '@angular/core';
import { BrandStamp } from '../brand-stamp/brand-stamp';
import { Gallery } from '../gallery/gallery';
import { Recipe } from '../../models/recipe.models';

@Component({
  selector: 'app-home',
  imports: [BrandStamp, Gallery],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  recipes: Recipe[] = [
    {
      id: 0,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '15 Min',
      isVegan: false,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 75,
      borderColor: '#4A5D23'
    },
    {
      id: 1,
      name: 'Spaghetti Aglio e Olio',
      image: 'images/recipes/ravioli.jpg',
      time: '20 Min',
      isVegan: true,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 60,
      borderColor: '#b38728'
    },
    {
      id: 2,
      name: 'Chicken Teriyaki Bowl',
      image: 'images/recipes/ravioli.jpg',
      time: '30 Min',
      isVegan: false,
      isVeggie: false,
      isFavorite: false,
      matchPercentage: 40,
      borderColor: '#b38728'
    },
    {
      id: 3,
      name: 'Vegan Buddha Bowl',
      image: 'images/recipes/ravioli.jpg',
      time: '25 Min',
      isVegan: true,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 85,
      borderColor: '#4A5D23'
    },
    {
      id: 4,
      name: 'Tomato Basil Pasta',
      image: 'images/recipes/ravioli.jpg',
      time: '15 Min',
      isVegan: true,
      isVeggie: true,
      isFavorite: false,
      matchPercentage: 70,
      borderColor: '#4A5D23'
    },
    {
      id: 5,
      name: 'Creamy Garlic Mushrooms',
      image: 'images/recipes/ravioli.jpg',
      time: '20 Min',
      isVegan: false,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 65,
      borderColor: '#b38728'
    },
    {
      id: 6,
      name: 'Beef Stroganoff',
      image: 'images/recipes/ravioli.jpg',
      time: '45 Min',
      isVegan: false,
      isVeggie: false,
      isFavorite: false,
      matchPercentage: 30,
      borderColor: '#a12424'
    },
    {
      id: 7,
      name: 'Quinoa Salad Bowl',
      image: 'images/recipes/ravioli.jpg',
      time: '10 Min',
      isVegan: true,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 90,
      borderColor: '#4A5D23'
    },
    {
      id: 8,
      name: 'Pesto Pasta',
      image: 'images/recipes/ravioli.jpg',
      time: '15 Min',
      isVegan: false,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 80,
      borderColor: '#4A5D23'
    },
    {
      id: 9,
      name: 'Sweet Potato Curry',
      image: 'images/recipes/ravioli.jpg',
      time: '35 Min',
      isVegan: true,
      isVeggie: true,
      isFavorite: false,
      matchPercentage: 85,
      borderColor: '#4A5D23'
    },
    {
      id: 10,
      name: 'Greek Salad',
      image: 'images/recipes/ravioli.jpg',
      time: '10 Min',
      isVegan: false,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 95,
      borderColor: '#4A5D23'
    },
    {
      id: 11,
      name: 'Salmon Rice Bowl',
      image: 'images/recipes/ravioli.jpg',
      time: '25 Min',
      isVegan: false,
      isVeggie: false,
      isFavorite: false,
      matchPercentage: 55,
      borderColor: '#b38728'
    }
  ];

  get favoriteRecipes(): Recipe[] {
    return this.recipes.filter(r => r.isFavorite);
  }
}
