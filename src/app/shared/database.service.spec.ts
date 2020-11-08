import { TestBed, inject } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

describe('DatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([DatabaseService], (service: DatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
