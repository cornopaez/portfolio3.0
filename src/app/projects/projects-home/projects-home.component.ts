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
  }

}
