import { TestBed, inject } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProjectCard } from '../projects/project-card';
import { ProjectDetails } from '../projects/projects-details/project-details';
import { ContactSuccess } from '../contact/contact-success/contact-success';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
        DatabaseService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(DatabaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([DatabaseService], (service: DatabaseService) => {
    expect(service).toBeTruthy();
  }));

  describe('getProjectsCards', () => {
    it('returns the project cards from the API on success', (done) => {
      const mockCards: ProjectCard[] = [{ card: { title: 'Portfolio3.0' }, project_name: 'Portfolio3.0' }];

      service.getProjectsCards().subscribe(result => {
        expect(result).toEqual(mockCards);
        done();
      });

      const req = httpMock.expectOne(environment.baseUrl + '/data/projects');
      expect(req.request.method).toBe('GET');
      req.flush(mockCards);
    });

    it('falls back to an empty array after retrying 3 times on failure', (done) => {
      service.getProjectsCards().subscribe(result => {
        expect(result).toEqual([]);
        done();
      });

      // Initial request + 3 retries = 4 total attempts before catchError kicks in.
      for (let i = 0; i < 4; i++) {
        httpMock.expectOne(environment.baseUrl + '/data/projects')
          .flush('simulated error', { status: 500, statusText: 'Server Error' });
      }
    });
  });

  describe('getProjectDetails', () => {
    it('returns the project details from the API on success', (done) => {
      const mockDetails: ProjectDetails = {
        view_title: 'Portfolio3.0',
        content: { description: 'A portfolio site.', source: 'https://example.com', footer: '', icons: [] }
      };

      service.getProjectDetails('Portfolio3.0').subscribe(result => {
        expect(result).toEqual(mockDetails);
        done();
      });

      const req = httpMock.expectOne(environment.baseUrl + '/data/Portfolio3.0');
      expect(req.request.method).toBe('GET');
      req.flush(mockDetails);
    });

    it('falls back to null after retrying 3 times on failure', (done) => {
      service.getProjectDetails('notarealproject').subscribe(result => {
        expect(result).toBeNull();
        done();
      });

      for (let i = 0; i < 4; i++) {
        httpMock.expectOne(environment.baseUrl + '/data/notarealproject')
          .flush('simulated error', { status: 404, statusText: 'Not Found' });
      }
    });
  });

  describe('submitContactForm', () => {
    const contactInfo = { name: 'Test', email: 'test@example.com', message: 'hi', urgent: false };

    it('returns the API response on success', (done) => {
      const mockResponse: ContactSuccess = { n: 1, ok: 1 };

      service.submitContactForm(contactInfo).subscribe(result => {
        expect(result).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(environment.baseUrl + '/data/contact');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(contactInfo);
      req.flush(mockResponse);
    });

    it('falls back to null after retrying 3 times on failure', (done) => {
      service.submitContactForm(contactInfo).subscribe(result => {
        expect(result).toBeNull();
        done();
      });

      for (let i = 0; i < 4; i++) {
        httpMock.expectOne(environment.baseUrl + '/data/contact')
          .flush('simulated error', { status: 400, statusText: 'Bad Request' });
      }
    });
  });
});
