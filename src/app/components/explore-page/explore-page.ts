import { Component } from '@angular/core';
import { Searchbar } from '../searchbar/searchbar';
import { PopularRecipes } from "../popular-recipes/popular-recipes";

@Component({
  selector: 'app-explore-page',
  imports: [Searchbar, PopularRecipes],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.css',
})
export class ExplorePage {}
