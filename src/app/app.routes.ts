import { Routes } from '@angular/router';
    
import { ShoppingList } from './components/shopping-list/shopping-list';
import { FridgeListComponent } from './components/fridge-list/fridge-list';

export const routes: Routes = [
  { path: 'shopping-list', component: ShoppingList },
  { path: 'fridge', component: FridgeListComponent }
];