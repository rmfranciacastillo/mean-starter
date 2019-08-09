import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() headerImage: string;
  @Input() heading: string;
  @Input() subheading: string;
  @Input() isPost: string;

  constructor() {
    this.headerImage = 'url(./assets/img/home-bg.jpg)';
    this.heading = 'Clean Blog';
    this.subheading = 'A blog starter';
    this.isPost = 'page';
  }

  ngOnInit() { }

}
