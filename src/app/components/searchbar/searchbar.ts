import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {
  @ViewChild('searchinput') searchinput!: ElementRef<HTMLInputElement>;
  @Output() searchChange = new EventEmitter<string>();
  isFocused = false;
  searchTerm = '';

  recent(orna : string) {
    console.log(orna + ' was clicked');
  }
}
