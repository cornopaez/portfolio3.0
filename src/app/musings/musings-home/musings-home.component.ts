import { Component, OnInit } from '@angular/core';
import { Musing } from './Musing';

@Component({
  selector: 'app-musings-home',
  templateUrl: './musings-home.component.html',
  styleUrls: ['./musings-home.component.sass']
})
export class MusingsHomeComponent implements OnInit {

  musings: Musing[] = [
      {
        header: '',
        icon: 'fab fa-raspberry-pi',
        title: 'Raspberry Pi Twonky Server',
        text: 'Clear, sure-fire instructions on how to deploy Twonky Media Server in your Raspberry Pi.',
        link: 'rpi-twonky',
      },
      {
        header: '',
        icon: 'fa-brands fa-ubuntu',
        title: 'Ubuntu HD Audio Playback',
        text: 'How to get HD Audio playback in latest Ubuntu releases.',
        link: 'ubuntu-hd-audio',
      },
      {
        header: 'New!',
        icon: 'fa-solid fa-shield-halved',
        title: 'TLS Full (Strict) Mode between Cloudflare and Heroku',
        text: 'How to enable TSL Full (Strict) Mode between Cloudflare and Heroku app.',
        link: 'tls-cloudflare-and-heroku',
      },
      {
        header: '',
        icon: 'devicon-jupyter-plain colored',
        title: 'SSL/TLS setup for your local lab',
        text: 'How to enable SSL/TLS for your local lab and apps, including Pi-Hole and JupyterLab.',
        link: 'tls-for-local-lab',
      },
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
