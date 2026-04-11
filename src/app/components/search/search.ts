import { Component } from '@angular/core';
import { SmartSearch } from '../smart-search/smart-search';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SmartSearch],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {}
