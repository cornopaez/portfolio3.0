import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rpi-twonky',
  templateUrl: './rpi-twonky.component.html',
  styleUrls: ['./rpi-twonky.component.sass']
})
export class RpiTwonkyComponent implements OnInit {
  currentContent = {
    content: {
      icons: [
        'fab fa-raspberry-pi',
        'fas fa-terminal'
      ],
      twonky: '../../../../assets/twonkyicon-120x120.png',
      image:'../../../../assets/damir-kopezhanov-P4me0QE8Wlk-unsplash.jpg'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
