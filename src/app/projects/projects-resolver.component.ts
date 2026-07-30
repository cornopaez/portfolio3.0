import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { DatabaseService } from '../shared/database.service'
import { ProjectCard } from './project-card'

@Injectable()
export class ProjectsResolver  {
  private dbs = inject(DatabaseService);
  private router = inject(Router);

  /**
    This function fetches the data necessary for the Projects view prior to activating the route.

    @return ProjectCard[] - The function returns an observable of type array full of Projects using the
                            unified service. If the projects are returned from the db, it returns them.
                            Otherwise, it prints a user-friendly error in the browser's console
                            and redirects the user to the unified Error view.
  */
  resolve() : Observable<ProjectCard[]> {

    return this.dbs.getProjectsCards().pipe(map(data => {
      if (data.length > 0) {
        return data
      } else {
        this.router.navigate(['/Error'])
      }
    }))
  }
}