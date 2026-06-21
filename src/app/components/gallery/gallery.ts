import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.models';

export type { Recipe };

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