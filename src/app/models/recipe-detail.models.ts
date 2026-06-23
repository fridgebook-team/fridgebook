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

export interface RecipeDetail {
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
