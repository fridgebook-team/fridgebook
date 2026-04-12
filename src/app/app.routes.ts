import { Routes } from '@angular/router';

import { ShoppingList } from './components/shopping-list/shopping-list';
import { FridgeListComponent } from './components/fridge-list/fridge-list';
import { Favorites } from './components/favorites/favorites';
import { ExplorePage } from './components/explore-page/explore-page';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: 'shopping-list', component: ShoppingList },
  { path: 'home', component: Home },
  { path: 'explore-page', component: ExplorePage },
  { path: 'favorites', component: Favorites },
  { path: 'fridge', component: FridgeListComponent }
];
