import { Component } from '@angular/core';

@Component({
  selector: 'app-tls-for-local-lab',
  templateUrl: './tls-for-local-lab.component.html',
  styleUrls: ['./tls-for-local-lab.component.sass'],
})
export class TlsForLocalLabComponent {
  currentContent = {
    content: {
      icons: [
        'fa-raspberry-pi fab',
        'fa-terminal fas'
      ],
      twonky: '../../../../assets/twonkyicon-120x120.png',
      cloudflare: [
        {
          img: '../../../../assets/cloudflare-7.png',
          alt: 'Image of the Cloudflare dashboard for a domain, showing where the Zone ID is in the page and the link to get an API token.'
        },
        {
          img: '../../../../assets/cloudflare-8.png',
          alt: 'Image of the Cloudflare dashboard for a domain, the page to create an API token.'
        },
      ],
      pihole: [
        {
          img: '../../../../assets/pihole-1.png',
          alt: 'Image of the Cloudflare dashboard for a domain, showing where the Zone ID is in the page and the link to get an API token.'
        },
        {
          img: '../../../../assets/pihole-2.png',
          alt: 'Image of the Cloudflare dashboard for a domain, showing where the Zone ID is in the page and the link to get an API token.'
        },
        ],
      jupyterlab:[
        {
          img: '../../../../assets/jupyterlab-1.png',
          alt: 'Image of the Cloudflare dashboard for a domain, showing where the Zone ID is in the page and the link to get an API token.'
        },
        ]
    },
    acme_commands: [
      {
        parameter: "--dns",
        description: "This configures the process used to validate ownership of your domain. Specifically, the <kbd>dns_cf</kbd> value uses a Cloudflare-specific process."
      },
      {
        parameter: "-d",
        description: "We'll need at least two of these. One for your domain, <code>mycustomdomain.local</code> in our case, and one for type of certificate we want, <code>'*.mycustomdomain.local'</code> in our case. You can certainly specify a single subdomain here instead of a wildcard one if that suits your needs. You can also add as many other subdomains as you want by adding more <code>-d</code> arguments to the command you issue, each with its own subdomain. To that end, the certificate created can be used for any of the subdomains you add."
      },
      {
        parameter: "--server",
        description: "The Certificate Authority (CA) to be used. <kbd>acme.sh</kbd> defaults to <a href=\"https://zerossl.com/\">ZeroSSL.com CA</a> but I like <a href=\"https://letsencrypt.org/\">Let's Encrypta</a> for this process."
      },
      {
        parameter: "--pre-hook",
        description: "The custom <kbd>bash</kbd> script to run before the certificates are installed or renewed. Useful if services need to be stopped or files need to be backed up to prevent issues."
      },
      {
        parameter: "--post-hook",
        description: "The customer <kbd>bash</kbd> script to run after the certificates are installed or renewed. Useful to bring back services online or moving files in place. "
      }
    ],
    columnsToDisplay: [
      'parameter', 
      'description'
      ]
  }
}
