import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { ThemeService } from './shared/theme.service'

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
    document.documentElement.removeAttribute('data-theme')
    localStorage.removeItem('theme')

    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        AppComponent
    ],
    providers: [
        ThemeService
    ],
}).compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    app = fixture.debugElement.componentInstance
    compiled = fixture.debugElement.nativeElement
  }))

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme')
    localStorage.removeItem('theme')
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  describe('Footer', () =>{
    it('should render the footer', () => {
      expect(compiled.querySelector('footer')).toBeTruthy()
    })

    it('should contain three correct links',()=>{
      for (const linkItem of links) {
        expect(compiled.querySelector("a[href='" + linkItem.link + "']").textContent).toEqual(linkItem.name)
      }
    })
  })

  describe('Theme toggle', () => {
    it('starts showing a moon (switch-to-dark) icon in light mode', () => {
      expect(component.currentTheme).toBe('light')
      expect(compiled.querySelector('.theme-toggle .fa-moon')).toBeTruthy()
      expect(compiled.querySelector('.theme-toggle .fa-sun')).toBeFalsy()
    })

    it('switches to dark and shows a sun (switch-to-light) icon on click', () => {
      const button = compiled.querySelector('.theme-toggle')

      button.click()
      fixture.detectChanges()

      expect(component.currentTheme).toBe('dark')
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(compiled.querySelector('.theme-toggle .fa-sun')).toBeTruthy()
      expect(compiled.querySelector('.theme-toggle .fa-moon')).toBeFalsy()
    })

    it('toggles back to light on a second click', () => {
      const button = compiled.querySelector('.theme-toggle')

      button.click()
      fixture.detectChanges()
      button.click()
      fixture.detectChanges()

      expect(component.currentTheme).toBe('light')
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })
  })
})
