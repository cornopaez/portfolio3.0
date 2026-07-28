import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { ContactFormComponent } from './contact-form.component'
import { DatabaseService } from '../../shared/database.service'
import { DialogService } from '../../shared/dialog.service'
import { NgxTurnstileModule, NgxTurnstileFormsModule } from 'ngx-turnstile';
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ContactSuccess } from '../contact-success/contact-success'

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let dbsSpy: jasmine.SpyObj<DatabaseService>;
  let dsSpy: jasmine.SpyObj<DialogService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    dbsSpy = jasmine.createSpyObj('DatabaseService', ['submitContactForm']);
    dsSpy = jasmine.createSpyObj('DialogService', ['confirm']);

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
        { provide: DatabaseService, useValue: dbsSpy },
        { provide: DialogService, useValue: dsSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('marks the form as sent and navigates to FormSuccess when the submission succeeds', () => {
      dbsSpy.submitContactForm.and.returnValue(of({ n: 1, ok: 1 } as ContactSuccess));

      component.onSubmit();

      expect(component.formSent).toBeTrue();
      expect(router.navigate).toHaveBeenCalledWith(['/Contact/FormSuccess']);
    });

    it('navigates to Error when the service resolves with a falsy result', () => {
      dbsSpy.submitContactForm.and.returnValue(of(null));

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['/Error']);
    });

    it('navigates to Error when the submission errors', () => {
      dbsSpy.submitContactForm.and.returnValue(throwError(() => new Error('simulated failure')));

      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledWith(['/Error']);
    });
  });

  describe('canDeactivate', () => {
    it('returns true without prompting when the form is untouched', () => {
      const result = component.canDeactivate();

      expect(result).toBe(true);
      expect(dsSpy.confirm).not.toHaveBeenCalled();
    });

    it('returns true without prompting when the form has already been sent', () => {
      component.contactForm.markAsDirty();
      component.formSent = true;

      const result = component.canDeactivate();

      expect(result).toBe(true);
      expect(dsSpy.confirm).not.toHaveBeenCalled();
    });

    it('prompts via DialogService when the form is dirty and not yet sent', (done) => {
      component.contactForm.markAsDirty();
      dsSpy.confirm.and.returnValue(of(false));

      const result = component.canDeactivate() as Observable<boolean>;

      expect(dsSpy.confirm).toHaveBeenCalledWith('Are you sure you want to discard changes?');
      result.subscribe(value => {
        expect(value).toBeFalse();
        done();
      });
    });
  });
});
