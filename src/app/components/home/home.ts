import { Component } from '@angular/core';
import { BrandStamp } from '../brand-stamp/brand-stamp';
import { Gallery } from '../gallery/gallery';

@Component({
  selector: 'app-home',
  imports: [BrandStamp, Gallery],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
