import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
import { FridgeService } from '../../services/fridge';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';


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
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {}

  filteredRecipes: Recipe[] = [];
  recipes: Recipe[] = [
    {
      id: 0,
      name: 'Creamy Tuscan Ravioli',
      subtitle: 'Cremige Pasta mit Spinat und Tomaten in 15 Minuten',
      image: 'images/recipes/ravioli.jpg',
      time: '15 Min',
      difficulty: 'Einfach',
      servings: '2',
      isVegan: false,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 75,
      borderColor: '#4A5D23',
      description: 'Schnelle cremige Pasta mit viel Geschmack.',
      tags: ['Schnell', 'Pasta', 'Comfort Food'],
      matchedIngredients: [],
      missingIngredients: [],
      ingredients: [
        { amount: '250 g', name: 'Ravioli' },
        { amount: '120 g', name: 'Kirschtomaten' },
        { amount: '80 g', name: 'Spinat' },
        { amount: '150 ml', name: 'Sahne' },
        { amount: '1 Zehe', name: 'Knoblauch' }
      ],
      steps: [
        { title: 'Kochen', description: 'Ravioli garen.' },
        { title: 'Sauce', description: 'Knoblauch, Tomaten und Sahne erhitzen.' }
      ],
      tips: [
        { icon: 'bi bi-lightbulb', text: 'Mit Parmesan verfeinern.' }
      ]
    },
    {
      id: 1,
      name: 'Spaghetti Aglio e Olio',
      subtitle: 'Einfach, schnell und voller Geschmack',
      image: 'images/recipes/ravioli.jpg',
      time: '20 Min',
      difficulty: 'Einfach',
      servings: '2',
      isVegan: true,
      isVeggie: true,
      isFavorite: false,
      matchPercentage: 60,
      borderColor: '#b38728',
      description: 'Knoblauch, Öl und Chili – mehr braucht es nicht.',
      tags: ['Vegan', 'Pasta', 'Schnell'],
      matchedIngredients: [],
      missingIngredients: [],
      ingredients: [
        { amount: '200 g', name: 'Spaghetti' },
        { amount: '3 EL', name: 'Olivenöl' },
        { amount: '2 Zehen', name: 'Knoblauch' },
        { amount: '1 TL', name: 'Chili Flocken' }
      ],
      steps: [
        { title: 'Pasta', description: 'Spaghetti kochen.' },
        { title: 'Mischen', description: 'Mit Öl, Knoblauch und Chili vermengen.' }
      ],
      tips: [
        { icon: 'bi bi-leaf', text: 'Perfekt vegan.' }
      ]
    },
    {
      id: 2,
      name: 'Chicken Teriyaki Bowl',
      subtitle: 'Asiatische Bowl mit Reis und Gemüse',
      image: 'images/recipes/ravioli.jpg',
      time: '30 Min',
      difficulty: 'Mittel',
      servings: '2',
      isVegan: false,
      isVeggie: false,
      isFavorite: false,
      matchPercentage: 40,
      borderColor: '#b38728',
      description: 'Herzhaft, süß und würzig.',
      tags: ['Bowl', 'Asiatisch'],
      matchedIngredients: [],
      missingIngredients: [],
      ingredients: [
        { amount: '200 g', name: 'Hähnchen' },
        { amount: '150 g', name: 'Reis' },
        { amount: '2 EL', name: 'Teriyaki Sauce' },
        { amount: '100 g', name: 'Brokkoli' }
      ],
      steps: [
        { title: 'Kochen', description: 'Reis und Hähnchen zubereiten.' },
        { title: 'Sauce', description: 'Alles mit Teriyaki mischen.' }
      ],
      tips: [
        { icon: 'bi bi-egg', text: 'Mit Sesam toppen.' }
      ]
    },
    {
      id: 3,
      name: 'Vegan Buddha Bowl',
      subtitle: 'Bunte Bowl voller Nährstoffe',
      image: 'images/recipes/ravioli.jpg',
      time: '25 Min',
      difficulty: 'Einfach',
      servings: '2',
      isVegan: true,
      isVeggie: true,
      isFavorite: true,
      matchPercentage: 85,
      borderColor: '#4A5D23',
      description: 'Frisch, gesund und sättigend.',
      tags: ['Vegan', 'Healthy'],
      matchedIngredients: [],
      missingIngredients: [],
      ingredients: [
        { amount: '100 g', name: 'Quinoa' },
        { amount: '1', name: 'Avocado' },
        { amount: '80 g', name: 'Kichererbsen' },
        { amount: '100 g', name: 'Karotten' }
      ],
      steps: [
        { title: 'Basis', description: 'Quinoa kochen.' },
        { title: 'Zusammenstellen', description: 'Alles in Bowl anrichten.' }
      ],
      tips: [
        { icon: 'bi bi-heart', text: 'Mit Tahini Dressing perfekt.' }
      ]
    },
    {
      id: 4,
      name: 'Tomato Basil Pasta',
      subtitle: 'Frische Tomaten mit Basilikum',
      image: 'images/recipes/ravioli.jpg',
      time: '15 Min',
      difficulty: 'Einfach',
      servings: '2',
      isVegan: true,
      isVeggie: true,
      isFavorite: false,
      matchPercentage: 70,
      borderColor: '#4A5D23',
      description: 'Sommerlich leicht und aromatisch.',
      tags: ['Pasta', 'Fresh'],
      matchedIngredients: [],
      missingIngredients: [],
      ingredients: [
        { amount: '200 g', name: 'Pasta' },
        { amount: '150 g', name: 'Tomaten' },
        { amount: '1 Bund', name: 'Basilikum' },
        { amount: '2 EL', name: 'Olivenöl' }
      ],
      steps: [
        { title: 'Kochen', description: 'Pasta kochen.' },
        { title: 'Mix', description: 'Mit Tomaten und Basilikum mischen.' }
      ],
      tips: [
        { icon: 'bi bi-sun', text: 'Perfekt im Sommer.' }
      ]
    }
  ];

  async ngOnInit() {
    await this.favoritesService.loadFavorites();
    await this.fridgeService.loadItems();
    //this.recipes = this.recipeService.getRecipes();

    const savedTime = localStorage.getItem('favoritesTimeFilter');
    if (savedTime) {
      this.selectedTime = savedTime;
    }

    this.veganFilterOn = document.documentElement.classList.contains('vegan') || false;
    this.veggieFilterOn = document.documentElement.classList.contains('veggie') || false;

    this.filteredRecipes = [...this.recipes];
    this.applyFilters();
    this.cdr.detectChanges();
    /*console.log('RECIPES:', this.recipes);
    console.log('FAVORITES:', this.favoritesService.favoriteIds);
    console.log('FILTERED:', this.filteredRecipes);*/
  }

  setTimeFilter(time: string) {
    this.selectedTime = time;
    localStorage.setItem('favoritesTimeFilter', time);
    this.applyFilters();
  }

  toggleVeggie() {
    this.veganFilterOn = false;
    document.documentElement.classList.remove('vegan');
    this.veggieFilterOn = !this.veggieFilterOn;
    document.documentElement.classList.toggle('veggie', this.veggieFilterOn);
    this.applyFilters();
  }

  toggleVegan() {
    this.veggieFilterOn = false;
    document.documentElement.classList.remove('veggie');
    this.veganFilterOn = !this.veganFilterOn;
    document.documentElement.classList.toggle('vegan', this.veganFilterOn);
    this.applyFilters();
  }

  async toggleFavorite(recipe: Recipe) {
    await this.favoritesService.toggleFavorite(recipe.id);
    await this.favoritesService.loadFavorites();
    this.applyFilters();
    this.cdr.detectChanges();
  }

  applyFilters() {
    this.recipes.forEach(recipe => {
      recipe.matchPercentage = this.calculateMatch(recipe);

      if (recipe.matchPercentage >= 70) {
        recipe.borderColor = '#4A5D23';
      } else if (recipe.matchPercentage >= 40) {
        recipe.borderColor = '#b38728';
      } else {
        recipe.borderColor = '#a12424';
      }
    });

    const timeLimit = parseInt(this.selectedTime);
    const favIds = this.favoritesService.favoriteIds;

    this.filteredRecipes = this.recipes.filter(recipe => {
      const isFavorite = favIds.includes(recipe.id);
      if (!isFavorite) return false;

      const recipeTime = parseInt(recipe.time);
      const matchesTime = recipeTime <= timeLimit;
      const matchesVegan = this.veganFilterOn ? recipe.isVegan : true;
      const matchesVeggie = this.veggieFilterOn ? (recipe.isVeggie ?? false) : true;

      return matchesTime && matchesVegan && matchesVeggie;
    });
  }

  calculateMatch(recipe: Recipe): number {
    const fridgeNames = this.fridgeService.items.map(item =>
      item.name.toLowerCase().trim()
    );

    const ingredients = recipe.ingredients.map(i => i.name);
    if (ingredients.length === 0) {
      return 0;
    }

    const matches = ingredients.filter(ingredient => {
      const ing = ingredient.toLowerCase().trim();
      return fridgeNames.some(fridge => fridge.includes(ing) || ing.includes(fridge));
    }).length;

    return ingredients.length === 0 ? 0 : Math.round(matches / ingredients.length * 100);
  }
}
