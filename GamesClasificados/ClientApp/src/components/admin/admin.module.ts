import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { CreateAdComponent } from '../admincreatead/createad.component';
import { MyadsComponent } from '../adminmyads/myads.component';
import { UserComponent } from '../adminuser/user.component';
import { AdminComponent } from './admin.component';
import { BaseModule } from '../../app/app.base.module';

@NgModule({
    imports: [
        BaseModule,
        AdminRoutingModule
      ],
      declarations: [
        AdminComponent,
        CreateAdComponent,
        MyadsComponent,
        UserComponent
      ]
})
export class AdminModule { }
