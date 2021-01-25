import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { ContactHomeComponent } from './contact-home.component'

describe('ContactHomeComponent', () => {
  let component: ContactHomeComponent
  let fixture: ComponentFixture<ContactHomeComponent>
  let compiled

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactHomeComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Content of view',()=>{
    describe('Social links',()=>{
      it('should have a link for twitter',()=>{
        const link = compiled.querySelector('div.card-columns div.card.social1 a')
        expect(link.textContent).toEqual('Go to Twitter')
        expect(link.getAttribute('href')).toEqual('https://www.twitter.com/cornopaez')
      })

      it('should NOT have a link for fb',()=>{
        const link = compiled.querySelector('div.card-columns div.card.social2 a.disabled')
        expect(link.textContent).toEqual('Go to Facebook')
        expect(link.getAttribute('href')).toBeNull()
      })

      it('should have a link for angellist',()=>{
        const link = compiled.querySelector('div.card-columns div.card.social3 a')
        expect(link.textContent).toEqual('Go to AngelList')
        expect(link.getAttribute('href')).toEqual('https://angel.co/jose-m-paez')
      })

      it('should have an email link',()=>{
        const link = compiled.querySelector('div.card-columns div.card.social4 a')
        expect(link.textContent).toEqual('Send Email')
        expect(link.getAttribute('href')).toEqual('mailto:contact@cornopaez.com')
      })

      it('should have a link to LinkedIn',()=>{
        const link = compiled.querySelector('div.card-columns div.card.social5 a')
        expect(link.textContent).toEqual('Go to LinkedIn')
        expect(link.getAttribute('href')).toEqual('https://www.linkedin.com/in/cornopaez')
      })

      it('should have a picture of the pup',()=>{
        const link = compiled.querySelector('div.card-columns div.card.corgi')
        expect(link).toBeTruthy()
        expect(link.querySelector('img.card-img')).toBeTruthy()
      })

      it('should have a link for the comments form',()=>{
        const link = compiled.querySelector('div.card-columns div.card.comments a')
        expect(link.textContent).toEqual('Show me the form')
        expect(link.getAttribute('routerLink')).toEqual('/Contact/form')
      })

      it('should have a leftover card',()=>{
        const link = compiled.querySelector('div.card-columns div.card.leftover')
        expect(link).toBeTruthy()
        expect(link.querySelector('small[class="text-muted"]')).toBeTruthy()
      })
    })
  })
})
