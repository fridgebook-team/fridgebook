import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {
  @ViewChild('searchinput') searchinput!: ElementRef<HTMLInputElement>;
  isFocused = false;
  recent(orna : string) {
    console.log(orna + ' was clicked');
  }
}
