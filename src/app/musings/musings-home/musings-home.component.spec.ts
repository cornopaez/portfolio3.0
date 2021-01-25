import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { MusingsHomeComponent } from './musings-home.component'

describe('MusingsHomeComponent', () => {
  let component: MusingsHomeComponent
  let fixture: ComponentFixture<MusingsHomeComponent>
  let compiled

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MusingsHomeComponent ]
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
})
