import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
