import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbuntuHdAudioComponent } from './ubuntu-hd-audio.component';

describe('UbuntuHdAudioComponent', () => {
  let component: UbuntuHdAudioComponent;
  let fixture: ComponentFixture<UbuntuHdAudioComponent>;
  let compiled
  let currentContent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbuntuHdAudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbuntuHdAudioComponent);
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.debugElement.nativeElement
    currentContent = component.currentContent
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Content of view',()=>{
    it('should have icons in jumbotron footnotes',()=>{
      expect(compiled.querySelector(".jumbotron .footnotes h4").textContent).toEqual('Tech used')

      for (var i = 0; i < currentContent.content.icons.length; ++i) {
         expect(compiled.querySelector(".jumbotron .footnotes ul li i[class='" + currentContent.content.icons[i] + "']")).toBeTruthy()
      }

      // expect(compiled.querySelector('.jumbotron .footnotes ul li.twonky img[src="' + currentContent.content.twonky + '"]'))
    })

    it('should have valid links for items in in table of contents', ()=>{
      const links = compiled.querySelectorAll('div.detail div.project-container ol li a')
      links.forEach((link)=>{
        expect(
          compiled.querySelector('div.detail div.project-container h2[id="' + link.getAttribute('fragment') + '"]') ||
          compiled.querySelector('div.detail div.project-container h3[id="' + link.getAttribute('fragment') + '"]')
        ).toBeTruthy()
      })
    })
  })
});
