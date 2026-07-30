import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tls-cloudflare-and-heroku',
    templateUrl: './tls-cloudflare-and-heroku.component.html',
    styleUrls: ['./tls-cloudflare-and-heroku.component.sass'],
    imports: [RouterLink]
})
export class TlsCloudflareAndHerokuComponent {
  currentContent = {
    content: {
      icons: [
        'fa-terminal fas',
        'fa-brands fa-cloudflare',
        'devicon-heroku-plain'
      ],
      new_cloudflare:[
          {
            img:'../../../../assets/cloudflare-1.png',
            alt:''
          },
          {
            img:'../../../../assets/cloudflare-2.png',
            alt:''
          },
          {
            img:'../../../../assets/cloudflare-3.png',
            alt:''
          },
          {
            img:'../../../../assets/cloudflare-4.png',
            alt:''
          },
          {
            img:'../../../../assets/cloudflare-5.png',
            alt:''
          },
          {
            img:'../../../../assets/cloudflare-6.png',
            alt:''
          },
        ],
      new_terminal:[
          {
            img:'../../../../assets/terminal-1.png',
            alt:''
          },
          {
            img:'../../../../assets/terminal-2.png',
            alt:''
          },
          {
            img:'../../../../assets/terminal-3.png',
            alt:''
          },
        ],
      new_heroku:[
          {
            img:'../../../../assets/heroku-1.png',
            alt:''
          },
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
  }

}
