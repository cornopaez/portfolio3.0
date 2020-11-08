import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { ProjectCard } from '../project-card'

@Component({
  selector: 'app-projects-home',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.sass']
})
export class ProjectsHomeComponent implements OnInit {

  currentCards: ProjectCard[]

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
    private route: ActivatedRoute,
    private title : Title
    ) { }

  ngOnInit() {
  	// Get the data for the projects
    this.route.data.subscribe(content => {
      // console.log(content)
      this.currentCards = content.projects
    })

    // Set the title for this view
    this.title.setTitle(this.currentContent.view_title)
  }

}
