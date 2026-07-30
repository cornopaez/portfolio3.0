import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { MusingsHomeComponent } from './musings-home.component'

describe('MusingsHomeComponent', () => {
  let component: MusingsHomeComponent
  let fixture: ComponentFixture<MusingsHomeComponent>
  let compiled

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [MusingsHomeComponent, RouterTestingModule]
})
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MusingsHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the correct title',()=>{
    expect(compiled.querySelector('div.jumbotron div.text-container h1').textContent).toEqual('These are some lessons learned')
  })

  it('should have at least one card', ()=>{
    expect(compiled.querySelector('div.card-container div.card')).toBeTruthy()
  })

  it('should have a card linking to the TLS Cloudflare/Heroku musing', ()=>{
    const link = compiled.querySelector('a[routerLink="./tls-cloudflare-and-heroku"]')
    expect(link).toBeTruthy()
    expect(link.textContent).toEqual('Get started')
  })

  it('should have a card linking to the TLS for local lab musing', ()=>{
    const link = compiled.querySelector('a[routerLink="./tls-for-local-lab"]')
    expect(link).toBeTruthy()
    expect(link.textContent).toEqual('Get started')
  })

  it('should render the TLS for local lab card icon as an image, not the unavailable devicon-jupyter-plain glyph', ()=>{
    const icon = compiled.querySelector('img.jupyter-icon')
    expect(icon).toBeTruthy()
    expect(icon.getAttribute('src')).toEqual('/assets/devicon-jupyter-original.svg')
    expect(compiled.querySelector('.devicon-jupyter-plain')).toBeFalsy()
  })
})
