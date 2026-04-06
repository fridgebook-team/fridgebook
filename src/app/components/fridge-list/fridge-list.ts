import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FridgeItem {
  name: string;
  quantity: number;
  unit: string;
  expiry?: string;
}

@Component({
  selector: 'app-fridge-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fridge-list.html',
  styleUrls: ['./fridge-list.css']
})
export class FridgeListComponent {
  items: FridgeItem[] = [
    { name: '🥛 Milk', quantity: 1, unit: 'liter', expiry: '2026-03-28' },
    { name: '🧀 Cheese', quantity: 200, unit: 'g', expiry: '2026-04-15' },
    { name: '🥚 Eggs', quantity: 6, unit: 'pieces', expiry: '2026-04-10' },
    { name: '🥬 Lettuce', quantity: 1, unit: 'head', expiry: '2026-03-25' },
    { name: '🍅 Tomatoes', quantity: 4, unit: 'pieces', expiry: '2026-03-27' }
  ];
}