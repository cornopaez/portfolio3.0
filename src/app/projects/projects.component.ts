import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  // private currentContent
  currentContent = {
      view_title: 'Mauricio_Páez | Projects',
      navbar: {
        title: 'Projects',
        links: [
          'Home',
          'About',
          'Contact'
        ]
      }
    };

  constructor(
  	    private title : Title
  	) { }

  
  setViewTitle(viewTitle){
    // Set the title for this view
    this.title.setTitle(viewTitle)
  }

  ngOnInit() {
  }

}
