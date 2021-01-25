import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {

  let component : AppComponent
  let fixture : ComponentFixture<AppComponent>
  let app
  let compiled
  const links = [
    {
      'name':'twitter',
      'link':'https://twitter.com/cornopaez'
    },
    {
      'name':'github',
      'link':'https://github.com/cornopaez'
    },
    {
      'name':'codewars',
      'link':'https://www.codewars.com/users/cornopaez'
    }
  ]

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    app = fixture.debugElement.componentInstance
    compiled = fixture.debugElement.nativeElement
  }))

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  describe('Footer', () =>{
    it('should render the footer', () => {
      expect(compiled.querySelector('footer')).toBeTruthy()
    })

    it('should contain three correct links',()=>{
      for (var i = 0; i < links.length; ++i) {
        expect(compiled.querySelector("a[href='" + links[i].link + "']").textContent).toEqual(links[i].name)
      }
    })
  })
})
