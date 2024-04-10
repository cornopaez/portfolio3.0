import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tls-cloudflare-and-heroku',
  // standalone: true,
  // imports: [],
  templateUrl: './tls-cloudflare-and-heroku.component.html',
  styleUrls: ['./tls-cloudflare-and-heroku.component.sass']
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
      ],
    },
    heroku_cli_comms: [
        {
          no: 1,
          command: "heroku login",
          description: "Log in to Heroku using the CLI."
        },
        {
          no: 2,
          command: "heroku certs:auto:disable --app=my_app",
          description: "Run if you already have ACM turned on for your Heroku app. Otherwise, it is not needed."
        },
        {
          no: 3,
          command : "heroku certs:add server.crt server.key --app=my_app",
          description: "Run to send the certificate and the key to Heroku to be used by your app. The names of the files, in this case `server.crt` and `server.key` should match what you initially called them."
        }
      ]
    ,
    columnsToDisplay: [
      'no',
      'command', 
      'description'
      ]
  }

  constructor() { }

  ngOnInit(): void {
  }
}
