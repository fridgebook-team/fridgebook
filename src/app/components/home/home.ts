import { Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { DisplayCard } from '../display-card/display-card';
import { BrandStamp } from '../brand-stamp/brand-stamp';
import { Gallery } from '../gallery/gallery';

@Component({
  selector: 'app-home',
  imports: [Icon, DisplayCard, BrandStamp, Gallery],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
