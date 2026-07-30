import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProjectDetailResolver } from './project-details-resolver.component';
import { DatabaseService } from '../../shared/database.service';
import { ProjectDetails } from './project-details';

describe('ProjectDetailResolver', () => {
  let resolver: ProjectDetailResolver;
  let dbsSpy: jasmine.SpyObj<DatabaseService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const routeSnapshot = (name: string): ActivatedRouteSnapshot => ({
    paramMap: convertToParamMap({ name })
  }) as ActivatedRouteSnapshot;

  beforeEach(() => {
    dbsSpy = jasmine.createSpyObj('DatabaseService', ['getProjectDetails']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ProjectDetailResolver,
        { provide: DatabaseService, useValue: dbsSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    resolver = TestBed.inject(ProjectDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('resolves with the project details when found', (done) => {
    const project: ProjectDetails = {
      view_title: 'Portfolio3.0',
      content: { description: 'A portfolio site.', source: 'https://example.com', footer: '', icons: [] }
    };
    dbsSpy.getProjectDetails.and.returnValue(of(project));

    resolver.resolve(routeSnapshot('Portfolio3.0')).subscribe(result => {
      expect(dbsSpy.getProjectDetails).toHaveBeenCalledWith('Portfolio3.0');
      expect(result).toEqual(project);
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('navigates to Projects and resolves null when no project is found', (done) => {
    dbsSpy.getProjectDetails.and.returnValue(of(null));

    resolver.resolve(routeSnapshot('notarealproject')).subscribe(result => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/Projects']);
      expect(result).toBeNull();
      done();
    });
  });
});
