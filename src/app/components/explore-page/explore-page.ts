import { Component } from '@angular/core';
import { Searchbar } from '../searchbar/searchbar';

@Component({
  selector: 'app-explore-page',
  imports: [ Searchbar ],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.css',
})
export class ExplorePage {}
