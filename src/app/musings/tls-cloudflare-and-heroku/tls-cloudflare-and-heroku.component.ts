import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tls-cloudflare-and-heroku',
  standalone: true,
  imports: [],
  templateUrl: './tls-cloudflare-and-heroku.component.html',
  styleUrl: './tls-cloudflare-and-heroku.component.sass'
})
export class TlsCloudflareAndHerokuComponent implements OnInit {
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
