import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musings',
  templateUrl: './musings.component.html',
  styleUrls: ['./musings.component.sass']
})
export class MusingsComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
