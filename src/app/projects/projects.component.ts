import { Component, inject } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.sass'],
    standalone: false
})
export class ProjectsComponent {
  private title = inject(Title);

  // private currentContent
  currentContent = {
      view_title: 'Mauricio_Páez | Projects',
      navbar: {
        title: 'Projects',
        links: [
          'Home',
          'About',
          'Contact',
          'Musings'
        ]
      }
    }

  setViewTitle(viewTitle){
    // Set the title for this view
    this.title.setTitle(viewTitle)
  }

}
