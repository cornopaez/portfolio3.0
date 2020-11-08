import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let app
  const currentContent = {
      view_title: 'Mauricio_Páez | Developer',
      content: {
        image: '../assets/close-up.png',
        description: 'IT Business Analysis, Web Development' ,
        description_links: [
          'Projects',
          'About',
          'Contact',
          'Musings'
        ]
      }
    }

  let compiled

  beforeEach(async(() => {
    // Create test bed
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [ HomeComponent ]
    }).compileComponents()

    // Create the fixtures
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    app = fixture.debugElement.componentInstance
    compiled = fixture.debugElement.nativeElement
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the correct description', ()=>{
    expect(compiled.querySelector('.intro-paragraph').textContent).toEqual(currentContent.content.description)
  })

  it('should have the correct description links', () =>{
    for (var i = 0; i < currentContent.content.description_links.length; ++i) {
      expect(compiled.querySelector("a[href='/" + currentContent.content.description_links[i] + "']").textContent).toEqual(currentContent.content.description_links[i])
    }
  })

  it('should display the correct image', () =>{
    expect(compiled.querySelector("img[src='" + currentContent.content.image + "']")).toBeTruthy()
  })
})
