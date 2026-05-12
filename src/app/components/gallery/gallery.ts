import { Component } from '@angular/core';
import { DisplayCard } from '../display-card/display-card';
@Component({
  selector: 'app-gallery',
  imports: [DisplayCard],
  standalone: true,
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {}