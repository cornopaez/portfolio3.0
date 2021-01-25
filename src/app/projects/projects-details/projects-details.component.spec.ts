import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ProjectsDetailsComponent } from './projects-details.component'
import { ProjectDetails } from './project-details'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('ProjectsDetailsComponent', () => {
  let component: ProjectsDetailsComponent
  let fixture: ComponentFixture<ProjectsDetailsComponent>
  let compiled
  const projectDetails = {
    project: {
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
      "view" : {
        "view_title" : "Mauricio_Páez | Portfolio 3.0",
        "content" : {
          "icons" : [
            "devicon-html5-plain-wordmark",
            "devicon-css3-plain-wordmark",
            "devicon-sass-original",
            "devicon-angularjs-plain",
            "devicon-express-original-wordmark",
            "devicon-nodejs-plain",
            "devicon-heroku-plain",
            "devicon-mongodb-plain-wordmark"
          ],
          "image" : "./assets/programming.jpg",
          "description" : "<i>This a moderate upgrade to Portfolio 2.0. It's been adapted to whatever the current version of Angular is (as of October 2019). Not much has changed: the design, architecture, and most source code is the same. Original description follows. </i> <br> <br>This a serious upgrade to my first Portfolio. Built from the ground up using Angular-CLI and Angular 2 (or is it 4?), it showcases my skills to build a functional site using a fair amount of its new features. There's a bit of everything: child routes, guards, and resolvers. The site makes use of a MEAN stack and the content for a few views comes from a MongoDB. I'm proud of how it turned out. Of course, the design is also mine (which explains why it's so sparse).",
          "source" : "https://github.com/cornopaez/portfolio3.0",
          "footer" : "Made by: Mauricio Páez - Pittsburgh 2018, 2019 - Photo by <a href=\"https://unsplash.com/photos/_yMciiStJyY?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText\">Maik Jonietz on Unsplash</a>",
          "imageStyle" : "portfolio3",
          "link": "/"
        },
        "contetn" : {
          "image" : "./assets/programming.jpg"
        },
        "indexDescription" : "This a moderate upgrade to Portfolio 2.0. It's been adapted to whatever the current version of Angular is (as of October 2019). Not much has changed: the design, architecture, and most source code is the same. Original description follows.",
        "indexKeywords" : "jose mauricio paez web developer angular mongodb expressjs nodejs node express sass heroku freelance development",
        "title" : "Portfolio 3.0"
      },
      "project_name" : "Portfolio3.0",
      "lastUpdate" : "2019-10-25T12:34:49.000Z"
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      providers: [
         // Properly provide the activated route mock object.
         { provide: ActivatedRoute, useValue: { data : of(projectDetails) } }
      ],
      declarations: [ ProjectsDetailsComponent ]
    })
    .compileComponents()
    fixture = TestBed.createComponent(ProjectsDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the back button',()=>{
    expect(compiled.querySelector("a.btn.btn-link[href='/Projects']").textContent).toEqual(' Back to Projects')
  })

  describe('Content of view', ()=>{
    const project = projectDetails.project.view
    it('should have correct class in jumbotron',()=>{
      expect(compiled.querySelector(".jumbotron." + project.content.imageStyle)).toBeTruthy()
    })

    it('should have icons in jumbotron footnotes',()=>{
      expect(compiled.querySelector(".jumbotron .footnotes h4").textContent).toEqual('Tech used')
      for (var i = 0; i < project.content.icons.length; ++i) {
         expect(compiled.querySelector(".jumbotron .footnotes ul li i[class='" + project.content.icons[i] + "']")).toBeTruthy()
      }
    })

    it('should have correct project title',()=>{
      expect(compiled.querySelector("div.project-detail h1").textContent).toEqual(project.title)
    })

    it('should render the correct project description HTML', ()=>{
      /*
        TODO: Update the data in the db for content.description as some </br> are missing the backslash that results when rendered.
      */
      expect(compiled.querySelector('div.project-detail div.project-container div.project-points p.project-description').innerHTML).toEqual(project.content.description)
    })

    it('should have a link to the source code of the project',()=>{
      expect(compiled.querySelector('div.project-detail div.project-container div.project-points p a[href="' + project.content.source + '"]')).toBeTruthy()
      expect(compiled.querySelector('div.project-detail div.project-container div.project-points p a[href="' + project.content.source + '"]').textContent).toEqual(project.content.source)
    })

    it('should have the correct project footer HTML',()=>{
      /*
        TODO: Update the footer text to HTML-encode all appropriate chars
      */
      expect(compiled.querySelector('div.project-detail div.project-container div.project-points p.project-footer').innerHTML).toEqual(project.content.footer)
    })

    it('should have a link to the compiled project', ()=>{
      /*
        TODO: Update model of projects in db to include links for all.
      */
      expect(compiled.querySelector('div.project-detail div.project-container div.project-points a.btn.btn-primary[href="' + project.content.link + '"]')).toBeTruthy()
    })
  })
})
