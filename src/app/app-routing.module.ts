import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';


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
    path: 'About', 
    component: AboutComponent 
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
