import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { ProjectsDetailsComponent } from './projects-details.component';
import { ProjectDetails } from './project-details'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'

describe('ProjectsDetailsComponent', () => {
  let component: ProjectsDetailsComponent;
  let fixture: ComponentFixture<ProjectsDetailsComponent>;
  const projectDetails = {
    project: {
      "_id" : "5db2ecfa1ae6656aad947259",
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
          "description" : "<i>This a moderate upgrade to Portfolio 2.0. It's been adapted to whatever the current version of Angular is (as of October 2019). Not much has changed: the design, architecture, and most source code is the same. Original description follows. </i> </br> </br>This a serious upgrade to my first Portfolio. Built from the ground up using Angular-CLI and Angular 2 (or is it 4?), it showcases my skills to build a functional site using a fair amount of its new features. There's a bit of everything: child routes, guards, and resolvers. The site makes use of a MEAN stack and the content for a few views comes from a MongoDB. I'm proud of how it turned out. Of course, the design is also mine (which explains why it's so sparse).",
          "source" : "https://github.com/cornopaez/portfolio3.0",
          "footer" : "Made by: Mauricio Páez - Pittsburgh 2018, 2019 - Photo by <a href=\"https://unsplash.com/photos/_yMciiStJyY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText\">Maik Jonietz on Unsplash</a>",
          "imageStyle" : "portfolio3"
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

  beforeEach(async(() => {
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
    .compileComponents();
    fixture = TestBed.createComponent(ProjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
