import { Routes } from '@angular/router';
    
import { ShoppingList } from './components/shopping-list/shopping-list';
import { FridgeListComponent } from './components/fridge-list/fridge-list';
import { Favorites } from './components/favorites/favorites';
import { Search } from './components/search/search';
import { Home } from './components/home/home';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail';

export const routes: Routes = [
  { path: 'shopping-list', component: ShoppingList },
  { path: 'home', component: Home },
  { path: 'search', component: Search },
  { path: 'favorites', component: Favorites },
  { path: 'fridge', component: FridgeListComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent }
];
