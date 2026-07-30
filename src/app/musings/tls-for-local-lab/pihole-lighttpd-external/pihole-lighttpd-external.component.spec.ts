import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiholeLighttpdExternalComponent } from './pihole-lighttpd-external.component';

describe('PiholeLighttpdExternalComponent', () => {
  let component: PiholeLighttpdExternalComponent;
  let fixture: ComponentFixture<PiholeLighttpdExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PiholeLighttpdExternalComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PiholeLighttpdExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
