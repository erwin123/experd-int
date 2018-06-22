import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { AuthguardService }  from './services/authguard.service';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ParticipantComponent } from './participant/participant.component';
import { CompetencyComponent } from './competency/competency.component';
import { AssessfirstComponent } from './assessfirst/assessfirst.component';
import { ClientComponent } from './client/client.component';
 
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', component: MaincontentComponent, canActivate: [AuthguardService],
       children: [
        { path: 'home', component: HomeComponent},
        { path: 'home/project', component: ProjectComponent},
        { path: 'home/participant', component: ParticipantComponent},
        { path: 'home/competency', component: CompetencyComponent},
        { path: 'home/assessfirst', component: AssessfirstComponent},
        { path: 'home/client', component: ClientComponent}
      ]},
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}