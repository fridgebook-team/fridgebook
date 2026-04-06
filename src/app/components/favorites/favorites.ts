import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  recipes: Recipe[] = [
  {
    id: 0,
    name: 'Creamy Tuscan Ravioli',
    image: 'images/recipes/ravioli.jpg',
    time: '30 Min',
    isVegan: true,
    isFavorite: true,
    matchPercentage: 75,
    borderColor: '#4A5D23'
  },
  {
    id: 1,
    name: 'Creamy Tuscan Ravioli',
    image: 'images/recipes/ravioli.jpg',
    time: '30 Min',
    isVegan: true,
    isFavorite: true,
    matchPercentage: 75,
    borderColor: '#4A5D23'
  },
  {
    id: 2,
    name: 'Creamy Tuscan Ravioli',
    image: 'images/recipes/ravioli.jpg',
    time: '30 Min',
    isVegan: true,
    isFavorite: true,
    matchPercentage: 75,
    borderColor: '#4A5D23'
  },
  {
    id: 1,
    name: 'Creamy Tuscan Ravioli',
    image: 'images/recipes/ravioli.jpg',
    time: '30 Min',
    isVegan: true,
    isFavorite: true,
    matchPercentage: 75,
    borderColor: '#4A5D23'
  },
  {
    id: 1,
    name: 'Creamy Tuscan Ravioli',
    image: 'images/recipes/ravioli.jpg',
    time: '30 Min',
    isVegan: true,
    isFavorite: true,
    matchPercentage: 75,
    borderColor: '#4A5D23'
  },
  {
    id: 1,
    name: 'Creamy Tuscan Ravioli',
    image: 'images/recipes/ravioli.jpg',
    time: '30 Min',
    isVegan: true,
    isFavorite: true,
    matchPercentage: 75,
    borderColor: '#4A5D23'
  },
  {
    id: 1,
    name: 'Creamy Tuscan Ravioli',
    image: 'images/recipes/ravioli.jpg',
    time: '30 Min',
    isVegan: true,
    isFavorite: true,
    matchPercentage: 75,
    borderColor: '#4A5D23'
  }
];
}

interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  isVegan: boolean;
  isFavorite: boolean;
  matchPercentage: number;
  borderColor: string;
}
