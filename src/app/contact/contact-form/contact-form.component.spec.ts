import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ContactFormComponent } from './contact-form.component'
import { DatabaseService } from '../../shared/database.service'
import { DialogService } from '../../shared/dialog.service'
import { NgxTurnstileModule, NgxTurnstileFormsModule } from 'ngx-turnstile';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        ContactFormComponent
    ],
    imports: [FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgxTurnstileModule,
        NgxTurnstileFormsModule],
    providers: [
        DatabaseService,
        DialogService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
