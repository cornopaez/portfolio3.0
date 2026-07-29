import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiholeLighttpdModOpensslInstallComponent } from './pihole-lighttpd-mod-openssl-install.component';

describe('PiholeLighttpdModOpensslInstallComponent', () => {
  let component: PiholeLighttpdModOpensslInstallComponent;
  let fixture: ComponentFixture<PiholeLighttpdModOpensslInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiholeLighttpdModOpensslInstallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiholeLighttpdModOpensslInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
