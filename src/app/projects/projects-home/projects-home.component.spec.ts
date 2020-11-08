import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectsHomeComponent } from './projects-home.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('ProjectsHomeComponent', () => {
  let component: ProjectsHomeComponent
  let fixture: ComponentFixture<ProjectsHomeComponent>
  let compiled
  const cards = {
    "projects": [
      {
        "card": {
          "title": "Portfolio 3.0",
          "subtitle": "",
          "custom_html": "",
          "image": "",
          "icons": {
            "class_name": "folder-icon",
            "icons": [
              "fas fa-terminal"
            ]
          },
          "card_class": "portfolio3"
        },
        "project_name": "Portfolio3.0"
      },
      {
        "card": {
          "title": "Portfolio 2.0",
          "subtitle": "",
          "custom_html": "",
          "image": "",
          "icons": {
            "class_name": "folder-icon",
            "icons": [
              "fas fa-code-branch"
            ]
          },
          "card_class": "portfolio2"
        },
        "project_name": "Portfolio2.0"
      },
      {
        "card": {
          "title": "MongoMart",
          "subtitle": "MongoDB University Capstone Project",
          "image": "../assets/mongo-leaf-512x512.png",
          "card_class": "mongo-capstone",
          "icons": {
            "class_name": "",
            "icons": []
          }
        },
        "project_name": "MongoMart"
      },
      {
        "card": {
          "title": "Health Cost Estimator",
          "subtitle": "",
          "custom_html": "",
          "image": "",
          "card_class": "health-care",
          "icons": {
            "class_name": "icons",
            "icons": [
              "fa fa-heartbeat",
              "fas fa-long-arrow-alt-down",
              "fas fa-dollar-sign"
            ]
          }
        },
        "project_name": "HealthCostEstimator"
      },
      {
        "card": {
          "title": "The Murders in the Rue Morge",
          "subtitle": "A text-based adventure game",
          "custom_html": "",
          "image": "../assets/poe.png",
          "card_class": "adventure-game",
          "icons": {
            "class_name":"",
            "icons":[]
          }
        },
        "project_name": "TheMurdersintheRueMorge"
      },
      {
        "card": {
          "title": "PYT Dance",
          "subtitle": "Codecademy Capstone Project",
          "custom_html": "",
          "image": "",
          "card_class": "dance",
          "icons": {
            "class_name":"",
            "icons":[]
          },
          "background_image": "./assets/faculty-photo.png"
        },
        "project_name": "PYTDance"
      },
      {
        "card": {
          "title": "The Bank",
          "subtitle": "",
          "image": "../assets/spiro.png",
          "card_class": "bank",
          "icons": {
            "class_name": "",
            "icons": []
          }
        },
        "project_name": "TheBank"
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
    fixture = TestBed.createComponent(ProjectsHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Project Cards',()=>{
    const card = cards.projects[0].card
    it('should create the card',()=>{
      expect(compiled.querySelector("div.project." + card.card_class)).toBeTruthy()
    })
  })

  describe('Card',()=>{
    it('should have the correct title', ()=>{
      const card = cards.projects[0].card
      expect(compiled.querySelector("div.project." + card.card_class + " h3").textContent).toEqual(card.title)
    })

    it('should have a subtitle', ()=>{
      const card = cards.projects[2].card
      expect(compiled.querySelector("div.project." + card.card_class + " h6").textContent).toEqual(card.subtitle)
    })

    it('should NOT have a subtitle', ()=>{
      const card = cards.projects[0].card
      expect(compiled.querySelector("div.project." + card.card_class + " h6")).toBeFalsy()
    })

    it('should have an image', ()=>{
      const card = cards.projects[6].card
      expect(compiled.querySelector("div.project." + card.card_class + " img[src='" + card.image + "']")).toBeTruthy()
    })

    it('should NOT have an image', ()=>{
      const card = cards.projects[0].card
      expect(compiled.querySelector("div.project." + card.card_class + " img[src='" + card.image + "']")).toBeFalsy()
    })

    it('should have icons', ()=>{
      const card = cards.projects[3].card
      expect(compiled.querySelector("div.project." + card.card_class + " div.icons." + card.icons.class_name)).toBeTruthy()
    })

    it('should NOT have icons', ()=>{
      /*
        TODO: Improve the model for cards as it lives in the DB. Some items are missing the icons object
        and can cause this test to fail.
      */
      const card = cards.projects[2].card
      expect(compiled.querySelector("div.project." + card.card_class + " div.icons")).toBeFalsy()
    })
  })
})
