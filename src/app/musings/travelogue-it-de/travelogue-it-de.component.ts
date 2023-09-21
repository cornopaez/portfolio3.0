import { Component } from '@angular/core';

@Component({
  selector: 'app-travelogue-it-de',
  templateUrl: './travelogue-it-de.component.html',
  styleUrls: ['./travelogue-it-de.component.sass']
})
export class TravelogueItDeComponent {
  currentContent = {
    content: {
      icons: [
        'fa-solid fa-plane',
        'fa-solid fa-ship',
        'fa-solid fa-train',
        'fa-solid fa-person-walking-luggage',
        'fa-solid fa-car',
        'fa-solid fa-passport'
      ]
    }
  }
}