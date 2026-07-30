import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContactComponent } from './contact.component'

describe('ContactComponent', () => {
  let component: ContactComponent
  let fixture: ComponentFixture<ContactComponent>
  let compiled
  let currentContent

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [ ContactComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
    currentContent = component.currentContent
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Content of view', ()=>{
    it('should have the correct title', ()=>{
      const title = compiled.querySelector('nav h1').textContent
      expect(title).toEqual('{ ' + currentContent.navbar.title + ' }')
    })

    it('should have the correct links in the pills', ()=>{
      const links = component.currentContent.navbar.links
      for (const link of links) {
        expect(compiled.querySelector("a[href='/" + link + "']").textContent).toEqual(link)
        expect(compiled.querySelector("a[href='/" + link + "']")).toBeTruthy()
      }
    })
  })
})
