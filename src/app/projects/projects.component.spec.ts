import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ProjectsComponent } from './projects.component'

describe('ProjectsComponent', () => {
  let component: ProjectsComponent
  let fixture: ComponentFixture<ProjectsComponent>
  let app
  let compiled

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [ ProjectsComponent ]
    })
    .compileComponents()
    fixture = TestBed.createComponent(ProjectsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    app = fixture.debugElement.componentInstance
    compiled = fixture.debugElement.nativeElement
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
    // console.log(component.currentContent)
  })

  describe('Navbar',()=>{

    it('should have the correct text in h1',()=>{
      const h1 = '{ ' + component.currentContent.navbar.title + ' }'
      expect(compiled.querySelector('h1').textContent).toEqual(h1)
    })

    it('should have the correct links in pills',()=>{
      const links = component.currentContent.navbar.links
      for (var i = 0; i < links.length; ++i) {
        expect(compiled.querySelector("a[href='/" + links[i] + "']").textContent).toEqual(links[i])
        expect(compiled.querySelector("a[href='/" + links[i] + "']")).toBeTruthy()
      }
    })
  })
})
