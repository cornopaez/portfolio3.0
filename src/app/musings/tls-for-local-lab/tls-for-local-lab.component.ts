import { Component } from '@angular/core';

@Component({
  selector: 'app-tls-for-local-lab',
  templateUrl: './tls-for-local-lab.component.html',
  styleUrls: ['./tls-for-local-lab.component.sass']
})
export class TlsForLocalLabComponent {
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
