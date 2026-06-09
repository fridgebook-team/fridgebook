export interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  isVegan: boolean;
  isVeggie: boolean;
  isFavorite: boolean;
  matchPercentage: number;
  borderColor: string;
}
