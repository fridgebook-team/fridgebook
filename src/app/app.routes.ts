import { Routes } from '@angular/router';
    
import { ShoppingList } from './components/shopping-list/shopping-list';
import { FridgeListComponent } from './components/fridge-list/fridge-list';
import { Favorites } from './components/favorites/favorites';
import { Search } from './components/search/search';
import { Home } from './components/home/home';
import { ScanPageComponent } from './components/scan-page/scan-page';

export const routes: Routes = [
  { path: 'shopping-list', component: ShoppingList },
  { path: 'home', component: Home },
  { path: 'search', component: Search },
  { path: 'favorites', component: Favorites },
  { path: 'fridge', component: FridgeListComponent },
  { path: 'scan', component: ScanPageComponent }
];