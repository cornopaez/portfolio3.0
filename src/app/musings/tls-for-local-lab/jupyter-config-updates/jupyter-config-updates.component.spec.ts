import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JupyterConfigUpdatesComponent } from './jupyter-config-updates.component';

describe('JupyterConfigUpdatesComponent', () => {
  let component: JupyterConfigUpdatesComponent;
  let fixture: ComponentFixture<JupyterConfigUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JupyterConfigUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JupyterConfigUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
