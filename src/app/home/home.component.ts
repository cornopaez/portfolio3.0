import { Component, OnInit, inject } from '@angular/core'
import { Title }     from '@angular/platform-browser'
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    imports: [RouterLink]
})
export class HomeComponent implements OnInit {
  private title = inject(Title);

  currentContent = {
      view_title: 'Mauricio_Páez | Developer',
      content: {
        image: '../assets/close-up.png',
        description: 'Data Analysis, IT Business Analysis, Web Development, Corgi enthusiast.' ,
        description_links: [
          'Projects',
          'About',
          'Contact',
          'Musings'
        ]
      }
    }

  ngOnInit() {
  	// Set the title for this view
    this.title.setTitle(this.currentContent.view_title)
  }
}