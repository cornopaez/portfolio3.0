import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectsComponent } from '../projects.component'

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.sass']
})
export class ProjectsDetailsComponent implements OnInit {

  // Class variables
  currentContent;

  constructor(
  	private route : ActivatedRoute,
    private pc: ProjectsComponent
  	) { }

  ngOnInit() {
  	    // Assign the data to local variable for use
    this.route.data.subscribe(content => {
      this.currentContent = content.project[0].view

      // Set the title for the Projects view
      this.pc.setViewTitle(content.project[0].view.view_title)
    })
  }

}
