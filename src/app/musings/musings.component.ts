import { Component } from '@angular/core';

@Component({
    selector: 'app-musings',
    templateUrl: './musings.component.html',
    styleUrls: ['./musings.component.sass'],
    standalone: false
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
