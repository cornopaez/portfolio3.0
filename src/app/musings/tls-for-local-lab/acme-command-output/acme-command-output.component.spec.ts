import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcmeCommandOutputComponent } from './acme-command-output.component';

describe('AcmeCommandOutputComponent', () => {
  let component: AcmeCommandOutputComponent;
  let fixture: ComponentFixture<AcmeCommandOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcmeCommandOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcmeCommandOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
