import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  const currentContent = {
      view_title: 'Mauricio_Páez | Developer',
      content: {
        image: '../assets/close-up.png',
        description: 'Data Analysis, IT Business Analysis, Web Development, Corgi enthusiast.' ,
        description_links: [
          'Projects',
          'About',
          'Contact',
          'Musings'
        ]
      }
    }

  let compiled

  beforeEach(waitForAsync(() => {
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
    compiled = fixture.debugElement.nativeElement
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the correct description', ()=>{
    expect(compiled.querySelector('.intro-paragraph').textContent).toEqual(currentContent.content.description)
  })

  it('should have the correct description links', () =>{
    for (const descriptionLink of currentContent.content.description_links) {
      expect(compiled.querySelector("a[href='/" + descriptionLink + "']").textContent).toEqual(descriptionLink)
    }
  })

  it('should display the correct image', () =>{
    expect(compiled.querySelector("img[src='" + currentContent.content.image + "']")).toBeTruthy()
  })
})
