import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ContactFormComponent } from './contact-form.component'
import { DatabaseService } from '../../shared/database.service'
import { DialogService } from '../../shared/dialog.service'
import { RecaptchaModule ,RecaptchaFormsModule } from 'ng-recaptcha';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ContactFormComponent
      ],
      imports:[
        FormsModule, 
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        RecaptchaModule,
        RecaptchaFormsModule
      ],
      providers: [
        DatabaseService,
        DialogService
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
