import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  servings: string;
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
export class RecipeDetailComponent {
  readonly recipe: RecipeDetail = {
    id: 0,
    title: 'Creamy Tuscan Ravioli',
    subtitle: 'Schnell, cremig und perfekt fuer einen entspannten Feierabend.',
    image: 'images/recipes/ravioli.jpg',
    badge: '75% Match mit deinem Kuehlschrank',
    duration: '15 Min.',
    difficulty: 'Einfach',
    servings: '2 Portionen',
    matchLabel: 'Du hast bereits die meisten Zutaten zuhause und musst nur wenig dazukaufen.',
    description:
      'Ein warmes Pasta-Gericht mit viel Geschmack, einer cremigen Sauce und genug Frische, damit es trotz Comfort Food leicht wirkt.',
    tags: ['Vegan','Vegetarisch', 'Schnell', 'Abendessen'],
    ingredients: [
      { amount: '250 g', name: 'Ravioli' },
      { amount: '1 EL', name: 'Olivenoel' },
      { amount: '2 Zehen', name: 'Knoblauch' },
      { amount: '120 g', name: 'Kirschtomaten' },
      { amount: '80 g', name: 'Spinat' },
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

  constructor(route: ActivatedRoute) {
    this.recipeId = route.snapshot.paramMap.get('id');
  }
}
