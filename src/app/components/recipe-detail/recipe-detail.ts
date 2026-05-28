import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FridgeService } from '../../services/fridge';
import { ShoppingListService } from '../../services/shopping-list';

interface RecipeStep {
  title: string;
  description: string;
}

interface RecipeIngredient {
  amount: string;
  name: string;
}

interface RecipeTip {
  icon: string;
  text: string;
}

interface RecipeDetail {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  duration: string;
  difficulty: string;
  servings: number;
  matchLabel: string;
  description: string;
  tags: string[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: RecipeTip[];
}

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetailComponent implements OnInit {
  readonly recipe: RecipeDetail = {
    id: 0,
    title: 'Creamy Tuscan Ravioli',
    subtitle: 'Schnell, cremig und perfekt fuer einen entspannten Feierabend.',
    image: 'images/recipes/ravioli.jpg',
    badge: '75% Match mit deinem Kuehlschrank',
    duration: '15 Min.',
    difficulty: 'Einfach',
    servings: 2,
    matchLabel: 'Du hast bereits die meisten Zutaten zuhause und musst nur wenig dazukaufen.',
    description:
      'Ein warmes Pasta-Gericht mit viel Geschmack, einer cremigen Sauce und genug Frische, damit es trotz Comfort Food leicht wirkt.',
    tags: ['Vegan','Vegetarisch', 'Schnell', 'Abendessen'],
    ingredients: [
      { amount: '250 g', name: 'Ravioli' },
      { amount: '1 EL', name: 'Olivenöl' },
      { amount: '2 Zehen', name: 'Knoblauch' },
      { amount: '120 g', name: 'Kirschtomaten' },
      { amount: '80 g', name: 'Samen' },
      { amount: '150 ml', name: 'Sahne oder Kochcreme' },
      { amount: '40 g', name: 'Parmesan' },
      { amount: 'nach Geschmack', name: 'Salz, Pfeffer, Chili' },
    ],
    steps: [
      {
        title: 'Pasta vorbereiten',
        description:
          'Ravioli nach Packungsanleitung garen und etwas Kochwasser auffangen.',
      },
      {
        title: 'Sauce aufbauen',
        description:
          'Olivenoel erhitzen, Knoblauch kurz anschwitzen und die Tomaten darin leicht aufplatzen lassen.',
      },
      {
        title: 'Cremigkeit und Frische',
        description:
          'Sahne einruehren, Spinat unterheben und mit Parmesan, Salz und Pfeffer abschmecken.',
      },
      {
        title: 'Alles zusammenfuehren',
        description:
          'Ravioli in die Sauce geben, bei Bedarf mit etwas Kochwasser binden und direkt servieren.',
      },
    ],
    tips: [
      { icon: 'bi bi-leaf-fill', text: 'Mit veganen Ravioli und Pflanzencreme klappt die vegane Variante.' },
      { icon: 'bi bi-bag-check-fill', text: 'Fehlt dir etwas, kannst du die fehlenden Zutaten direkt auf die Einkaufsliste setzen.' },
    ],
  };

  readonly recipeId: string | null;

  constructor(
    route: ActivatedRoute,
    private fridgeService: FridgeService,
    private shoppingListService: ShoppingListService,
    private cdr: ChangeDetectorRef
  ) {
    this.recipeId = route.snapshot.paramMap.get('id');
  }

  
  //BERECHNUNG VON ZUTATEN-KÜHLSCHRANK-MATCH

  async ngOnInit() {
    await this.fridgeService.loadItems();

    this.calculateMatch();
    this.cdr.detectChanges();
  }

  matchPercentage = 0;
  missingIngredients: string[] = [];
  showAddMessage = false;
  recipeCookedMessage = false;
  recipeIsCooked = false;

  calculateMatch() {

    const fridge = this.fridgeService.items.map(item => item.name.toLowerCase().trim()); //Kühlschrank
    const recipeIngredients = this.recipe.ingredients.map(i => i.name.toLowerCase().trim()); //Zutaten

    let matched = 0;
    this.missingIngredients = [];

    recipeIngredients.forEach(ingredient => {

      const exists = fridge.some(fridgeItem =>
        fridgeItem.includes(ingredient) ||
        ingredient.includes(fridgeItem)
      );

      if (exists) {
        matched++;
      } else {
        this.missingIngredients.push(ingredient);
      }
    });

    this.matchPercentage = Math.round( (matched / recipeIngredients.length) * 100 );
  }


  async addMissingToShoppingList() {
    for (const ingredient of this.missingIngredients) {
      await this.shoppingListService.addItem(ingredient);
    }
    this.showAddMessage = true;
    this.cdr.detectChanges();
  }


  // BERECHNUNG DER PORTIONEN

  currentServings = this.recipe.servings;

  increaseServings() { 
    this.currentServings++; 
  }

  decreaseServings() {
    if (this.currentServings > 1) { this.currentServings--; }
  }

  getIngredientAmount(amount: string): string {

    const numberMatch = amount.match(/[\d.]+/); //Zahl finden

    if (!numberMatch) return amount;

    const originalNumber = parseFloat(numberMatch[0]);

    const scaledNumber = (originalNumber / this.recipe.servings) * this.currentServings; //neue Menge
    return amount.replace(numberMatch[0], scaledNumber.toString()); //ersetzen
  }


  // REZEPT GEKOCH BUTTON - ENTFERNT VERWENDETE ZUTATEN

  async recipeCooked() {

    for (const ingredient of this.recipe.ingredients) {

      const amount = parseInt(ingredient.amount); // Zahl holen aus 250g
      if (isNaN(amount)) continue;

      const fridgeItem = this.fridgeService.items.find(item => {

        const fridgeName = item.name.toLowerCase();
        const ingredientName = ingredient.name.toLowerCase();

        return (fridgeName.includes(ingredientName) || ingredientName.includes(fridgeName));
      });

      if (!fridgeItem) continue;

      fridgeItem.quantity -= amount;

      if (fridgeItem.quantity <= 0) {
        await this.fridgeService.removeItem(fridgeItem);

      } else {
        await this.fridgeService.updateItem(fridgeItem);
      }
    }

    this.recipeCookedMessage = true;
    this.recipeIsCooked = true;

    this.calculateMatch();
    this.cdr.detectChanges();

    await this.fridgeService.loadItems();
  }
}
