import { NgModule } from '@angular/core';
import { BaseModule } from '../../app/app.base.module';
import { MainRoutingModule } from './main.routing.module';

import { MainComponent } from './main.component';
import { ConsolesComponent } from '../mainconsoles/consoles.component';
import { SectionComponent } from '../mainsection/section.component';
import { ShowroomComponent } from '../mainshowroom/showroom.component';
import { AdsComponent } from '../mainads/ads.component';
import { UseradsComponent } from '../mainuserads/userads.component';


import { TermOfServiceComponent } from '../termsofservice/term-of-service.component';
import { PolicyComponent } from '../policy/policy.component';
import { ContactUsComponent } from '../contactus/contactus.component';

@NgModule({
  imports: [
    MainRoutingModule,
    BaseModule
  ],
  declarations: [
    MainComponent,
    ConsolesComponent,
    SectionComponent,
    ShowroomComponent,
    AdsComponent,
    UseradsComponent,
    TermOfServiceComponent,
    PolicyComponent,
    ContactUsComponent
  ]
})
export class MainModule {
}
