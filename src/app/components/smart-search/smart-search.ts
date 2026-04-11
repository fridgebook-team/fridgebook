import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Recipe {
  name: string;
  ingredients: string[];
  prepTime: number; // minutes
}

@Component({
  selector: 'app-smart-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './smart-search.html',
  styleUrls: ['./smart-search.css']
})
export class SmartSearch implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  currentSearch: string = '';
  recentSearches: string[] = [];
  recipes: Recipe[] = [
    { name: 'Spaghetti Carbonara', ingredients: ['Spaghetti', 'Eier', 'Pecorino', 'Guanciale'], prepTime: 20 },
    { name: 'Pizza Margherita', ingredients: ['Teig', 'Tomatensauce', 'Mozzarella', 'Basilikum'], prepTime: 30 },
    { name: 'Bauernfrühstück', ingredients: ['Kartoffeln', 'Eier', 'Speck', 'Zwiebeln'], prepTime: 25 },
    { name: 'Vegane Linsensuppe', ingredients: ['Linsen', 'Karotten', 'Sellerie', 'Kokosmilch'], prepTime: 35 },
    { name: 'Hähnchencurry', ingredients: ['Hähnchen', 'Reis', 'Currypaste', 'Kokosmilch'], prepTime: 40 },
    { name: 'Käsespätzle', ingredients: ['Spätzle', 'Käse', 'Röstzwiebeln', 'Butter'], prepTime: 25 },
    { name: 'Wurstsalat', ingredients: ['Bierschinken', 'Zwiebeln', 'Essig', 'Öl'], prepTime: 10 },
    { name: 'Apfelstrudel', ingredients: ['Äpfel', 'Strudelteig', 'Zimt', 'Rosinen'], prepTime: 45 }
  ];

  get filteredRecipes(): Recipe[] {
    if (!this.currentSearch.trim()) {
      return [];
    }
    const searchLower = this.currentSearch.toLowerCase();
    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchLower))
    );
  }

  constructor() {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      this.recentSearches = JSON.parse(saved);
    }
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  onSearchInput() {
    // live search – filteredRecipes aktualisiert sich automatisch
  }

  selectRecentSearch(term: string) {
    this.currentSearch = term;
    this.saveSearch(term);
    // Fokus bleibt im Feld, Ergebnisse werden sofort durch currentSearch angezeigt
  }

  private saveSearch(term: string) {
    if (!term.trim()) return;
    this.recentSearches = this.recentSearches.filter(t => t !== term);
    this.recentSearches.unshift(term);
    this.recentSearches = this.recentSearches.slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }
}
