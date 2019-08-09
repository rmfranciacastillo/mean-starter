import { Component, OnInit } from '@angular/core';

import { Story } from '../shared/story.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  stories: Story[];

  constructor() { }

  ngOnInit() {
    this.stories = [
      {
        author: 'Renato',
        title: 'Blog post',
        text: 'Lorem labore dolores voluptatibus autem eaque modi. Esse optio totam',
        date: Date.now()
      },
      {
        author: 'Renato',
        title: 'Blog post',
        text: 'Lorem labore dolores voluptatibus autem eaque modi. Esse optio totam',
        date: Date.now()
      },
      {
        author: 'Renato',
        title: 'Blog post',
        text: 'Lorem labore dolores voluptatibus autem eaque modi. Esse optio totam',
        date: Date.now()
      },
      {
        author: 'Renato',
        title: 'Blog post',
        text: 'Lorem labore dolores voluptatibus autem eaque modi. Esse optio totam',
        date: Date.now()
      },
      {
        author: 'Renato',
        title: 'Blog post',
        text: 'Lorem labore dolores voluptatibus autem eaque modi. Esse optio totam',
        date: Date.now()
      }
    ];
  }

}
