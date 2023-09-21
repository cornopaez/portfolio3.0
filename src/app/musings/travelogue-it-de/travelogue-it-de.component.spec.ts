import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelogueItDeComponent } from './travelogue-it-de.component';

describe('TravelogueItDeComponent', () => {
  let component: TravelogueItDeComponent;
  let fixture: ComponentFixture<TravelogueItDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelogueItDeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelogueItDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
