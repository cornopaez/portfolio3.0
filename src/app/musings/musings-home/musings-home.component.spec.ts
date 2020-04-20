import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusingsHomeComponent } from './musings-home.component';

describe('MusingsHomeComponent', () => {
  let component: MusingsHomeComponent;
  let fixture: ComponentFixture<MusingsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusingsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusingsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
