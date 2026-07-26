import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ContactFormComponent } from './contact-form.component'
import { DatabaseService } from '../../shared/database.service'
import { DialogService } from '../../shared/dialog.service'
import { RecaptchaModule ,RecaptchaFormsModule } from 'ng-recaptcha';
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
        RecaptchaModule,
        RecaptchaFormsModule],
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
