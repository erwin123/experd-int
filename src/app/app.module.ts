import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from "@clr/angular";
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { SidenavmenuComponent } from './sidenavmenu/sidenavmenu.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { AuthguardService } from "./services/authguard.service";
import { AuthloginService } from "./services/authlogin.service";
import { LocalStorageModule } from 'angular-2-local-storage';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticipantComponent } from './participant/participant.component';
import { CompetencyComponent } from './competency/competency.component';
import { AssessfirstComponent } from './assessfirst/assessfirst.component';
import { AppfirstService } from './services/appfirst.service';
import { ClientComponent } from './client/client.component';
import { ClientService } from './services/client.service';
import { LobService } from './services/lob.service';
import { AlertComponent } from './alert/alert.component';
import { ClientContactComponent } from './client-contact/client-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavmenuComponent,
    LoginComponent,
    MaincontentComponent,
    HomeComponent,
    ProjectComponent,
    ParticipantComponent,
    CompetencyComponent,
    AssessfirstComponent,
    ClientComponent,
    AlertComponent,
    ClientContactComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    LocalStorageModule.withConfig({
        prefix: 'my-app',
        storageType: 'localStorage'
    })
  ],
  providers: [AuthguardService, AuthloginService, AppfirstService, ClientService, LobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
