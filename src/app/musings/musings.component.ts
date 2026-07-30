import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-musings',
    templateUrl: './musings.component.html',
    styleUrls: ['./musings.component.sass'],
    imports: [RouterLink, RouterOutlet]
})
export class MusingsComponent {

  currentContent = {
    view_title: 'Mauricio_Páez | Musings',
    navbar: {
      title: 'Musings',
      links: [
        'Home',
        'About',
        'Projects',
        'Contact'
      ]
    }
  }

}
