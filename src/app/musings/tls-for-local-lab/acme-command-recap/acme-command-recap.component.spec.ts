import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcmeCommandRecapComponent } from './acme-command-recap.component';

describe('AcmeCommandRecapComponent', () => {
  let component: AcmeCommandRecapComponent;
  let fixture: ComponentFixture<AcmeCommandRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcmeCommandRecapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcmeCommandRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
