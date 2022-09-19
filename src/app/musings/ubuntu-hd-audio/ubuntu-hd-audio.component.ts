import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ubuntu-hd-audio',
  templateUrl: './ubuntu-hd-audio.component.html',
  styleUrls: ['./ubuntu-hd-audio.component.sass']
})
export class UbuntuHdAudioComponent implements OnInit {
  currentContent = {
    content: {
      icons: [
        'fa-brands fa-ubuntu',
        'fa-terminal fas'
      ],
      hd_audio: 'https://www.jas-audio.or.jp/jas_cms/wp-content/themes/jas2022/old/img/jas/jas-hires-logo/jas-hires-logo_clip_image004.png',
      alsamixer: [
        '../../../../assets/alsamixer-1.png',
        '../../../../assets/alsamixer-2.png',
        '../../../../assets/alsamixer-3.png',
      ],
      ubuntu_settings: [
        '../../../../assets/ubuntu-settings-1.png',
      ]
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
