import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser'
import { ProjectDetails } from './project-details'

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.sass']
})
export class ProjectsDetailsComponent implements OnInit {

  // Class variables
  currentContent: ProjectDetails

  constructor(
  	private route : ActivatedRoute,
    private title: Title
  	) { }

  ngOnInit() {
  	// Assign the data to local variable for use
    this.route.data.subscribe(content => {
      this.currentContent = content.project.view

      // Set the title for the Projects view
      this.title.setTitle(this.currentContent.view_title)
    })
  }

}
