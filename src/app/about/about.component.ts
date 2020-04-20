import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BACKGROUND, LANGUAGES, EXPERIENCE, EDUCATION } from './about'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

    currentContent = {
    view_title: 'Mauricio_Páez | About',
    navbar: {
      title: 'About',
      links: [
        'Home',
        'Projects',
        'Contact',
        'Musings'
      ]
    }
  }

  background = BACKGROUND
  languages = LANGUAGES
  experience = EXPERIENCE
  education = EDUCATION

  constructor(
    private title : Title
    ) { }

  ngOnInit() {
    // Set the title for this view
    this.title.setTitle(this.currentContent.view_title)
    // console.log(this.currentContent)
  }

}
