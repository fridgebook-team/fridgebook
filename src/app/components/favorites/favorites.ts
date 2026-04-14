import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-favorites',
  imports: [CommonModule, Icon, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  selectedTime: string = '30 min.';
  veganFilterOn: boolean = false;

  filteredRecipes: Recipe[] = [];

  recipes: Recipe[] = [
    {
      id: 0,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '15 Min',
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
      isVegan: false,
      isFavorite: true,
      matchPercentage: 15,
      borderColor: '#a12424'
    },
    {
      id: 2,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '60 Min',
      isVegan: true,
      isFavorite: true,
      matchPercentage: 50,
      borderColor: '#b38728'
    },
    {
      id: 1,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '90 Min',
      isVegan: true,
      isFavorite: true,
      matchPercentage: 90,
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

  ngOnInit() {
    this.applyFilters();
  }

  setTimeFilter(time: string) {
    this.selectedTime = time;
    this.applyFilters();
  }

  toggleVegan() {
    this.veganFilterOn = !this.veganFilterOn;
    this.applyFilters();
  }

  applyFilters() {
    const timeLimit = parseInt(this.selectedTime);

    this.filteredRecipes = this.recipes.filter(recipe => {
      const recipeTime = parseInt(recipe.time);
      const matchesTime = recipeTime <= timeLimit;

      const matchesVegan = this.veganFilterOn ? recipe.isVegan : true;

      return matchesTime && matchesVegan;
    });
  }

  toggleFavorite(recipe: Recipe) {
    recipe.isFavorite = !recipe.isFavorite;

    this.applyFilters();
  }


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
