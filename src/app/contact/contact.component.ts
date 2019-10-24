import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

	currentContent = {
      view_title: 'Mauricio_Páez | Contact',
      navbar: {
        title: 'Contact',
        links: [
          'Home',
          'Projects',
          'About'
        ]
      }
    };

  constructor(
  	private title : Title
  	) { }

  ngOnInit() {
  	// Set the title for this view
    this.title.setTitle(this.currentContent.view_title)
    // console.log(this.currentContent)
  }

}
