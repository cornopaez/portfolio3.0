import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlsCloudflareAndHerokuComponent } from './tls-cloudflare-and-heroku.component';

describe('TlsCloudflareAndHerokuComponent', () => {
  let component: TlsCloudflareAndHerokuComponent;
  let fixture: ComponentFixture<TlsCloudflareAndHerokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TlsCloudflareAndHerokuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TlsCloudflareAndHerokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
