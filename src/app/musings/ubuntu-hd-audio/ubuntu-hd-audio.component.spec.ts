import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbuntuHdAudioComponent } from './ubuntu-hd-audio.component';

describe('UbuntuHdAudioComponent', () => {
  let component: UbuntuHdAudioComponent;
  let fixture: ComponentFixture<UbuntuHdAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbuntuHdAudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbuntuHdAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
