import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { DatabaseService } from './shared/database.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ErrorComponent,
    ProjectsComponent,
    ProjectsHomeComponent,
    ProjectsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    Title,
    ProjectsResolver,
    ProjectDetailResolver,
    DatabaseService,
    DialogService,
    CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
