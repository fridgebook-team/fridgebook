import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
import { FridgeService } from '../../services/fridge';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, Icon, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  selectedTime: string = '30 min.';
  veganFilterOn: boolean = false;
  veggieFilterOn: boolean = false;

  constructor(
    public favoritesService: FavoritesService,
    private fridgeService: FridgeService,
    private cdr: ChangeDetectorRef
  ) {}

  filteredRecipes: Recipe[] = [];

  recipes: Recipe[] = [
    {
      id: 0,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '15 Min',
      isVegan: true,
      isVeggie: true,
      matchPercentage: 0,
      borderColor: '',
      ingredients: [
        'Ravioli',
        'Olivenoel',
        'Knoblauch',
        'Kirschtomaten',
        'Spinat',
        'Sahne',
        'Parmesan'
      ]
    },
    {
      id: 1,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '30 Min',
      isVegan: false,
      isVeggie: false,
      matchPercentage: 0,
      borderColor: '',
      ingredients: [
        'Ravioli',
        'Olivenoel',
        'Knoblauch',
        'Kirschtomaten',
        'Spinat',
        'Sahne',
        'Parmesan'
      ]
    },
    {
      id: 2,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '60 Min',
      isVegan: false,
      isVeggie: true,
      matchPercentage: 0,
      borderColor: '',
      ingredients: [
        'Ravioli',
        'Olivenoel',
        'Knoblauch',
        'Kirschtomaten',
        'Spinat',
        'Sahne',
        'Parmesan'
      ]
    },
    {
      id: 3,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '90 Min',
      isVegan: true,
      isVeggie: true,
      matchPercentage: 0,
      borderColor: '',
      ingredients: [
        'Ravioli',
        'Olivenoel',
        'Knoblauch',
        'Kirschtomaten',
        'Spinat',
        'Sahne',
        'Parmesan'
      ]
    },
    {
      id: 4,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '30 Min',
      isVegan: false,
      isVeggie: false,
      matchPercentage: 0,
      borderColor: '',
      ingredients: [
        'Ravioli',
        'Olivenoel',
        'Knoblauch',
        'Kirschtomaten',
        'Spinat',
        'Sahne',
        'Parmesan'
      ]
    },
    {
      id: 5,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '30 Min',
      isVegan: true,
      isVeggie: true,
      matchPercentage: 0,
      borderColor: '',
      ingredients: [
        'Ravioli',
        'Olivenoel',
        'Knoblauch',
        'Kirschtomaten',
        'Spinat',
        'Sahne',
        'Parmesan'
      ]
    },
    {
      id: 6,
      name: 'Creamy Tuscan Ravioli',
      image: 'images/recipes/ravioli.jpg',
      time: '30 Min',
      isVegan: false,
      isVeggie: true,
      matchPercentage: 0,
      borderColor: '',
      ingredients: [
        'Ravioli',
        'Olivenoel',
        'Knoblauch',
        'Kirschtomaten',
        'Spinat',
        'Sahne',
        'Parmesan'
      ]
    }
  ];

  async ngOnInit() {
    await this.favoritesService.loadFavorites();
    await this.fridgeService.loadItems();
    const savedTime = localStorage.getItem('favoritesTimeFilter');

    if (savedTime) {
      this.selectedTime = savedTime;
    }

    this.veganFilterOn = document.documentElement.classList.contains('vegan') || false;
    this.veggieFilterOn = document.documentElement.classList.contains('veggie') || false;

    //initial rendern
    this.filteredRecipes = [...this.recipes];

    this.applyFilters();
    this.cdr.detectChanges();
  }

  setTimeFilter(time: string) {
    this.selectedTime = time;
    localStorage.setItem('favoritesTimeFilter', time);
    this.applyFilters();
  }

  toggleVeggie() {
    // vegan ausschalten
    this.veganFilterOn = false;
    document.documentElement.classList.remove('vegan');

    this.veggieFilterOn = !this.veggieFilterOn;
    document.documentElement.classList.toggle('veggie', this.veggieFilterOn);

    this.applyFilters();
  }

  toggleVegan() {
    // veggie ausschalten
    this.veggieFilterOn = false;
    document.documentElement.classList.remove('veggie');

    this.veganFilterOn = !this.veganFilterOn;
    document.documentElement.classList.toggle('vegan', this.veganFilterOn);
    
    this.applyFilters();
  }
  
  async toggleFavorite(recipe: Recipe) {
    await this.favoritesService.toggleFavorite(recipe.id);

    //neue favoriten (ohne die gelöschte) laden
    await this.favoritesService.loadFavorites();
    this.applyFilters();
    this.cdr.detectChanges();
  }

  applyFilters() {
    this.recipes.forEach(recipe => {
      recipe.matchPercentage = this.calculateMatch(recipe);

      if (recipe.matchPercentage >= 70) {
        recipe.borderColor = '#4A5D23';
      }
      else if (recipe.matchPercentage >= 40) {
        recipe.borderColor = '#b38728';
      }
      else {
        recipe.borderColor = '#a12424';
      }

    });

    const timeLimit = parseInt(this.selectedTime);

    const favIds = this.favoritesService.favoriteIds;

    this.filteredRecipes = this.recipes.filter(recipe => {

      // nur Favorites anzeigen
      const isFavorite = favIds.includes(recipe.id);
      if (!isFavorite) return false;

      const recipeTime = parseInt(recipe.time);
      const matchesTime = recipeTime <= timeLimit;

      const matchesVegan = this.veganFilterOn ? recipe.isVegan : true;
      const matchesVeggie = this.veggieFilterOn ? recipe.isVeggie : true;

      return matchesTime && matchesVegan && matchesVeggie;
    });
  }

  calculateMatch(recipe: Recipe): number {

    const fridgeNames = this.fridgeService.items.map(item =>
      item.name.toLowerCase().trim()
    );

    const matches = recipe.ingredients.filter(ingredient => {

      const ing = ingredient.toLowerCase().trim();

      return fridgeNames.some(fridge =>
        fridge.includes(ing) ||
        ing.includes(fridge)
      );

    }).length;

    return Math.round(matches / recipe.ingredients.length * 100);
  }

}

interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  isVegan: boolean;
  isVeggie: boolean;
  matchPercentage: number;
  borderColor: string;
  ingredients: string[];
}
