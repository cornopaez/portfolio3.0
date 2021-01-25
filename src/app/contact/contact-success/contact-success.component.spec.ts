import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { ContactSuccessComponent } from './contact-success.component'

describe('ContactSuccessComponent', () => {
  let component: ContactSuccessComponent
  let fixture: ComponentFixture<ContactSuccessComponent>
  let compiled

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSuccessComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSuccessComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Content of view', ()=>{
    it('should have the correct icon',()=>{
      const icon = compiled.querySelector('div.contact_success div.success_text i[class="fa-thumbs-up fas"]')
      expect(icon).toBeTruthy()
    })

    it('should have a link to the game', ()=>{
      const link = compiled.querySelector('div.contact_success div.success_text p a[routerLink="/Projects/TheMurdersintheRueMorge"]')
      expect(link).toBeTruthy()
    })

    it('should have a link to baseUrl',()=>{
      const link = compiled.querySelector('div.contact_success div.success_text p a[routerLink="/"]')
      expect(link).toBeTruthy()
    })
  })
})
