import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
 
import { DatabaseService } from '../../shared/database.service'
import { ProjectDetails } from './project-details'

 
@Injectable()
export class ProjectDetailResolver  {
  private dbs = inject(DatabaseService);
  private router = inject(Router);

  /**
    This function fetches the data necessary for the Project Details view prior to activating the route.

    @param route - State of the current route (from @angular/router)
    @return Observable<ProjectDetails> - The function returns an observable of type ProjectDetails using the
                                          unified service. If the details are found in the db, it returns the details found.
                                          Otherwise, it prints a user-friendly error in the browser's console
                                          and redirects the user to the main Projects listing
  */
  resolve(route: ActivatedRouteSnapshot) : Observable<ProjectDetails> {
    // Get the project name from route
    const projectName = route.paramMap.get('name')

    return this.dbs.getProjectDetails(projectName).pipe(map(project => {
      if (project !== null) {
        return project;
      } else {
        this.router.navigate(['/Projects']);
        return null;
      }
    }))
  }
}