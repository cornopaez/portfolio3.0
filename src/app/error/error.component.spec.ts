import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { ErrorComponent } from './error.component'

describe('ErrorComponent', () => {
  let component: ErrorComponent
  let fixture: ComponentFixture<ErrorComponent>
  let compiled

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have correct icon',()=>{
    const icon = compiled.querySelector('.error .container i[class="fa-exclamation-circle fas"]')
    expect(icon).toBeTruthy()
  })

  it('should have a link back to baseUrl',()=>{
    const link = compiled.querySelector('.error .container a[routerLink="/"]')
    expect(link).toBeTruthy()
  })
})
