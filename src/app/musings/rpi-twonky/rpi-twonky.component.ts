import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-rpi-twonky',
    templateUrl: './rpi-twonky.component.html',
    styleUrls: ['./rpi-twonky.component.sass'],
    imports: [RouterLink]
})
export class RpiTwonkyComponent {
  currentContent = {
    content: {
      icons: [
        'fa-raspberry-pi fab',
        'fa-terminal fas'
      ],
      twonky: '../../../../assets/twonkyicon-120x120.png'
    }
  }

}
