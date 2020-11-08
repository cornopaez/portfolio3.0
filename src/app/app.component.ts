import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  links = [
    {
      'name':'twitter',
      'link':'https://twitter.com/cornopaez'
    },
    {
      'name':'github',
      'link':'https://github.com/cornopaez'
    },
    {
      'name':'codewars',
      'link':'https://www.codewars.com/users/cornopaez'
    }
  ]
}
