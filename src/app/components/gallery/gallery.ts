import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class Gallery {
  cards = [1, 2, 3, 4, 5, 6, 7, 8];
}