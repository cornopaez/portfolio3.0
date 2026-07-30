import { Component, OnInit, inject } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { BACKGROUND, LANGUAGES, EXPERIENCE, EDUCATION } from './about'
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.sass'],
    imports: [RouterLink]
})
export class AboutComponent implements OnInit {
    private title = inject(Title);

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

  ngOnInit() {
    // Set the title for this view
    this.title.setTitle(this.currentContent.view_title)
    // console.log(this.currentContent)
  }

}
