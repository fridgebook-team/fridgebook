import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FridgeListComponent } from './fridge-list/fridge-list';

@Component({
  selector: 'app-root',
  imports: [FridgeListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');
}
