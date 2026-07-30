import { Component, OnInit, inject } from '@angular/core';
import { Theme, ThemeService } from './shared/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: false
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

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

  currentTheme: Theme = 'light';

  ngOnInit() {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  toggleTheme() {
    this.currentTheme = this.themeService.toggle();
  }
}
