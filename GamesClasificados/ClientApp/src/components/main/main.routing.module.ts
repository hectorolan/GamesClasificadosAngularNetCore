import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ConsolesComponent } from '../mainconsoles/consoles.component';
import { SectionComponent } from '../mainsection/section.component';
import { ShowroomComponent } from '../mainshowroom/showroom.component';
import { UseradsComponent } from '../mainuserads/userads.component';
import { AdsComponent } from '../mainads/ads.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuardService } from '../../services/auth-guard.service';
import { TermOfServiceComponent } from '../termsofservice/term-of-service.component';
import { PolicyComponent } from '../policy/policy.component';
import { ContactUsComponent } from '../contactus/contactus.component';

const routes: Routes = [
  {
    path: 'games',
    component: MainComponent,
    children: [
      { path: '', component: ConsolesComponent },
      { path: 'tos', component: TermOfServiceComponent },
      { path: 'policy', component: PolicyComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'user/:id', component: UseradsComponent },
      { path: ':console', component: SectionComponent },
      { path: ':console/:section', component: ShowroomComponent },
      { path: ':console/:section/:id', component: AdsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuardService
  ]
})
export class MainRoutingModule { }
