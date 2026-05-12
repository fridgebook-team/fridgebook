import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-brand-stamp',
  imports: [Icon],
  standalone: true,
  templateUrl: './brand-stamp.html',
  styleUrl: './brand-stamp.css',
})
export class BrandStamp {}
