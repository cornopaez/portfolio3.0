import { Component, OnInit, inject } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.sass'],
    imports: [RouterLink, RouterOutlet]
})
export class ContactComponent implements OnInit {
	private title = inject(Title);

	currentContent = {
      view_title: 'Mauricio_Páez | Contact',
      navbar: {
        title: 'Contact',
        links: [
          'Home',
          'Projects',
          'About',
          'Musings'
        ]
      }
    };

  ngOnInit() {
  	// Set the title for this view
    this.title.setTitle(this.currentContent.view_title)
  }

}
