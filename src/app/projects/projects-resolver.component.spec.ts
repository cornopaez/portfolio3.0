import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProjectsResolver } from './projects-resolver.component';
import { DatabaseService } from '../shared/database.service';
import { ProjectCard } from './project-card';

describe('ProjectsResolver', () => {
  let resolver: ProjectsResolver;
  let dbsSpy: jasmine.SpyObj<DatabaseService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    dbsSpy = jasmine.createSpyObj('DatabaseService', ['getProjectsCards']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ProjectsResolver,
        { provide: DatabaseService, useValue: dbsSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    resolver = TestBed.inject(ProjectsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('resolves with the project cards when data is returned', (done) => {
    const cards: ProjectCard[] = [{ card: { title: 'Portfolio3.0' } }];
    dbsSpy.getProjectsCards.and.returnValue(of(cards));

    resolver.resolve().subscribe(result => {
      expect(result).toEqual(cards);
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('navigates to Error when no project cards are returned', (done) => {
    dbsSpy.getProjectsCards.and.returnValue(of([]));

    resolver.resolve().subscribe(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/Error']);
      done();
    });
  });
});
