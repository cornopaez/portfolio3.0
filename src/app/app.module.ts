import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsHomeComponent } from './projects/projects-home/projects-home.component';
import { ProjectsDetailsComponent } from './projects/projects-details/projects-details.component';
import { ProjectsResolver } from './projects/projects-resolver.component';
import { ProjectDetailResolver } from './projects/projects-details/project-details-resolver.component';
import { DialogService } from './shared/dialog.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';

// reCaptcha imports
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { DatabaseService } from './shared/database.service';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactHomeComponent } from './contact/contact-home/contact-home.component';
import { ContactSuccessComponent } from './contact/contact-success/contact-success.component';
import { MusingsComponent } from './musings/musings.component';
import { RpiTwonkyComponent } from './musings/rpi-twonky/rpi-twonky.component';
import { MusingsHomeComponent } from './musings/musings-home/musings-home.component';
import { UbuntuHdAudioComponent } from './musings/ubuntu-hd-audio/ubuntu-hd-audio.component';
import { TlsCloudflareAndHerokuComponent } from './musings/tls-cloudflare-and-heroku/tls-cloudflare-and-heroku.component';
import { TlsForLocalLabComponent } from './musings/tls-for-local-lab/tls-for-local-lab.component';
import { PhLighttpdComponent } from './musings/tls-for-local-lab/ph-lighttpd/ph-lighttpd.component';
import { PhJupyterlabComponent } from './musings/tls-for-local-lab/ph-jupyterlab/ph-jupyterlab.component';
import { PiholeLighttpdExternalComponent } from './musings/tls-for-local-lab/pihole-lighttpd-external/pihole-lighttpd-external.component';
import { PiholeLighttpdModOpensslInstallComponent } from './musings/tls-for-local-lab/pihole-lighttpd-mod-openssl-install/pihole-lighttpd-mod-openssl-install.component';
import { AcmeCommandRecapComponent } from './musings/tls-for-local-lab/acme-command-recap/acme-command-recap.component';
import { AcmeCommandOutputComponent } from './musings/tls-for-local-lab/acme-command-output/acme-command-output.component';
import { JupyterConfigUpdatesComponent } from './musings/tls-for-local-lab/jupyter-config-updates/jupyter-config-updates.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ErrorComponent,
    ProjectsComponent,
    ProjectsHomeComponent,
    ProjectsDetailsComponent,
    ContactComponent,
    ContactFormComponent,
    ContactHomeComponent,
    ContactSuccessComponent,
    MusingsComponent,
    RpiTwonkyComponent,
    MusingsHomeComponent,
    UbuntuHdAudioComponent,
    TlsCloudflareAndHerokuComponent,
    TlsForLocalLabComponent,
    PhLighttpdComponent,
    PhJupyterlabComponent,
    PiholeLighttpdExternalComponent,
    PiholeLighttpdModOpensslInstallComponent,
    AcmeCommandRecapComponent,
    AcmeCommandOutputComponent,
    JupyterConfigUpdatesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [
    Title,
    ProjectsResolver,
    ProjectDetailResolver,
    DatabaseService,
    DialogService,
    CanDeactivateGuard,
    { provide: APP_ID, useValue: 'serverApp' },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
