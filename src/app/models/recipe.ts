export interface RecipeStep {
  title: string;
  description: string;
}

export interface RecipeIngredient {
  amount: string;
  name: string;
}

export interface RecipeTip {
  icon: string;
  text: string;
}

export interface Recipe {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  time: string;
  difficulty: string;
  servings: string;
  isVegan: boolean;
  isFavorite: boolean;
  matchPercentage: number;
  borderColor: string;
  description: string;
  tags: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: RecipeTip[];
}
