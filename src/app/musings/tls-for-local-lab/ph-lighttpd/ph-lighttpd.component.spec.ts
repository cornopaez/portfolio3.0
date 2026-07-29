import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhLighttpdComponent } from './ph-lighttpd.component';

describe('PhLighttpdComponent', () => {
  let component: PhLighttpdComponent;
  let fixture: ComponentFixture<PhLighttpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhLighttpdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhLighttpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
