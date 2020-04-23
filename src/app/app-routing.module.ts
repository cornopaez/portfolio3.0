import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { MusingsComponent } from './musings/musings.component';
import { MusingsHomeComponent } from './musings/musings-home/musings-home.component';
import { RpiTwonkyComponent } from './musings/rpi-twonky/rpi-twonky.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsResolver } from './projects/projects-resolver.component';
import { ProjectsDetailsComponent } from './projects/projects-details/projects-details.component';
import { ProjectsHomeComponent } from './projects/projects-home/projects-home.component';
import { ProjectDetailResolver } from './projects/projects-details/project-details-resolver.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component'
import { ContactHomeComponent } from './contact/contact-home/contact-home.component'
import { ContactSuccessComponent } from './contact/contact-success/contact-success.component'
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service'

const routes: Routes = [
	{ 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'Home', 
    redirectTo: '', 
    pathMatch: 'full'
  },
  { 
    path: 'Projects', 
    component: ProjectsComponent,
    children: [
      {
        path: ':name',
        component: ProjectsDetailsComponent,
        resolve: {
          project: ProjectDetailResolver
        }
      },
      {
        path: '',
        component: ProjectsHomeComponent,
        resolve: {
          projects: ProjectsResolver
        },
      }
    ]
  },
  { 
    path: 'About', 
    component: AboutComponent 
  },
  { 
    path: 'Contact',
    component: ContactComponent,
    children: [
      {
        path: 'form',
        component: ContactFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'FormSuccess',
        component: ContactSuccessComponent
      },
      {
        path: '',
        component: ContactHomeComponent
      }
    ]
  },
  {
    path: 'Musings',
    component: MusingsComponent,
    children: [
      {
        path: '',
        component: MusingsHomeComponent
      },
      {
        path: 'rpi-twonky',
        component: RpiTwonkyComponent
      }
    ]
  },
  {
    path: 'Error', 
    component: ErrorComponent 
  },
  {
    path: '**',
    redirectTo: 'Error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
