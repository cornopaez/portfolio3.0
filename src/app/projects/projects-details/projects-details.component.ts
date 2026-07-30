import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { ProjectDetails } from './project-details'
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-projects-details',
    templateUrl: './projects-details.component.html',
    styleUrls: ['./projects-details.component.sass'],
    imports: [RouterLink, NgClass]
})
export class ProjectsDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  // Class variables
  currentContent: ProjectDetails

  ngOnInit() {
  	// Assign the data to local variable for use
    this.route.data.subscribe(content => {
      this.currentContent = content.project.view

      // Set the title for the Projects view
      this.title.setTitle(this.currentContent.view_title)
    })
  }

}
