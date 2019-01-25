import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../../app/app.base.module';
import { LoginRoutingModule } from './login.routing.module';
import { EmailVerificationComponent } from '../loginemailverification/email-verification.component';
import { GetEmailDialogComponent } from '../logindialoggetemail/get-email-dialog.component';
import { SignUpComponent } from '../loginsignup/sign-up.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
      BaseModule,
      CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    EmailVerificationComponent,
    GetEmailDialogComponent,
    SignUpComponent
  ],
  entryComponents: [
    GetEmailDialogComponent
  ],
  exports: [
    GetEmailDialogComponent
  ]
})
export class LoginModule { }
