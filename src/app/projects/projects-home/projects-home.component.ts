import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { ProjectCard } from '../project-card'

@Component({
    selector: 'app-projects-home',
    templateUrl: './projects-home.component.html',
    styleUrls: ['./projects-home.component.sass'],
    imports: [RouterLink]
})
export class ProjectsHomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  currentCards: ProjectCard[]

  ngOnInit() {
  	// Get the data for the projects
    this.route.data.subscribe(content => {
      // console.log(content)
      this.currentCards = content.projects
    })
  }

}
