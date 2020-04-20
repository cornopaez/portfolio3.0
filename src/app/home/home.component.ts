import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  currentContent = {
      view_title: 'Mauricio_Páez | Developer',
      content: {
        image: '../assets/close-up.png',
        description: 'IT Business Analysis, Web Development' ,
        description_links: [
          'Projects',
          'About',
          'Contact',
          'Musings'
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
