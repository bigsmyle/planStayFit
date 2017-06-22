import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from  './map/map.component';
import { MapDirective } from  './map/map.directive';
import { WorkoutSchedule } from  './workout-schedule/workout-schedule.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsAPIWrapper } from '@agm/core';
import { AuthService } from './service/auth.manager';
import { NoteService } from './service/note.manager';
import { TokenManager } from './service/token.manager';
import { AuthGuard } from './routes/home-guard';
import { UnauthenticatedGuard } from './routes/unauthenticated-guard';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCH8TaxKqTOP2ol0q7JJdZjEgmPTEvGrus',libraries: ['places']}),
    AppRoutingModule
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MapComponent,
    MapDirective,
    WorkoutSchedule
  ],
  providers: [
    
    GoogleMapsAPIWrapper,
    AuthService,
    NoteService,
    TokenManager,
    AuthGuard,
    UnauthenticatedGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

// AIzaSyC4WjI8oNHDwr8CSsrqOfLsQRcInivIRRw