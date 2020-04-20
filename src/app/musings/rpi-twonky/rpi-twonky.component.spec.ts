import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpiTwonkyComponent } from './rpi-twonky.component';

describe('RpiTwonkyComponent', () => {
  let component: RpiTwonkyComponent;
  let fixture: ComponentFixture<RpiTwonkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpiTwonkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpiTwonkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
