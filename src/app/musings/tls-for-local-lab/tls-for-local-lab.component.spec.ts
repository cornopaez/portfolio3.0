import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlsForLocalLabComponent } from './tls-for-local-lab.component';

describe('TlsForLocalLabComponent', () => {
  let component: TlsForLocalLabComponent;
  let fixture: ComponentFixture<TlsForLocalLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlsForLocalLabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlsForLocalLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
