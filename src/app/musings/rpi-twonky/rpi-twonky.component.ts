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
        'fa-raspberry-pi fab',
        'fa-terminal fas'
      ],
      twonky: '../../../../assets/twonkyicon-120x120.png'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
