import { Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { DisplayCard } from '../display-card/display-card';

@Component({
  selector: 'app-home',
  imports: [Icon, DisplayCard],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
