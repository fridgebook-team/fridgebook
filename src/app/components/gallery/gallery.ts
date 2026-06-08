import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class Gallery {
  @Input() recipes: Recipe[] = [];
  @Input() title: string = '';
}