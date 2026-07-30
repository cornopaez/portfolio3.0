import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ProjectsComponent } from './projects.component'

describe('ProjectsComponent', () => {
  let component: ProjectsComponent
  let fixture: ComponentFixture<ProjectsComponent>
  let compiled

  beforeEach(waitForAsync(() => {
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
      for (const link of links) {
        expect(compiled.querySelector("a[href='/" + link + "']").textContent).toEqual(link)
        expect(compiled.querySelector("a[href='/" + link + "']")).toBeTruthy()
      }
    })
  })
})
