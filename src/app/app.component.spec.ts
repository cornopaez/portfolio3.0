import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {

  let component : AppComponent
  let fixture : ComponentFixture<AppComponent>
  let app

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents()
  }))

  beforeEach(() =>{
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    app = fixture.debugElement.componentInstance
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it(`should have as title 'portfolio3'`, () => {
    expect(app.title).toEqual('portfolio3')
  })

  it('should render the footer', () => {
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('footer')).toBeTruthy()
  })
})
