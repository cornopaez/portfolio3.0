import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectsHomeComponent } from './projects-home.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('ProjectsHomeComponent', () => {
  let component: ProjectsHomeComponent
  let fixture: ComponentFixture<ProjectsHomeComponent>
  const cards = {
    projects: [
      {
        "card" : {
          "title" : "Portfolio 3.0",
          "subtitle" : "",
          "custom_html" : "",
          "image" : "",
          "icons" : {
            "class_name" : "folder-icon",
            "icons" : [
              "fas fa-terminal"
            ]
          },
          "card_class" : "portfolio3"
        },
        "project_name" : "Portfolio3.0"
      }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsHomeComponent
      ],
      imports:[
        RouterTestingModule
      ],
      providers: [
         // Properly provide the activated route mock object.
         { provide: ActivatedRoute, useValue: { data : of(cards) } }
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
