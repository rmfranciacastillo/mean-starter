import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  isOpen: boolean;

  constructor() { }

  ngOnInit() {
    this.isOpen = true;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
