import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhJupyterlabComponent } from './ph-jupyterlab.component';

describe('PhJupyterlabComponent', () => {
  let component: PhJupyterlabComponent;
  let fixture: ComponentFixture<PhJupyterlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhJupyterlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhJupyterlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
