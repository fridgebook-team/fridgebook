import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { FridgeListComponent } from './components/fridge-list/fridge-list';

import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  //imports: [FridgeListComponent],
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');
}
