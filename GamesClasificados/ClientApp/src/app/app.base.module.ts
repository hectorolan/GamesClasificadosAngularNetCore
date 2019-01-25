import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material Module import 
import { MaterialModule } from '../material.module';
// Shared Components
import { AdComponent } from '../components/ad/ad.component';
import { AdlistComponent } from '../components/adlist/adlist.component';
import { FormAccountComponent } from '../components/formaccount/form-account.component';
import { YesCancelDialogComponent } from '../components/dialogyescancel/yes-cancel-dialog.component';
import { ButtonUpImgAzureComponent } from '../components/buttonuploadimage/button-upimg-azure.component';
// Pipes
import { HashToArrayPipe } from '../pipes/hashtoarray.pipe';
import { PolicyComponent } from '../components/policy/policy.component';
import { TermOfServiceComponent } from '../components/termsofservice/term-of-service.component';
import { ContactUsComponent } from '../components/contactus/contactus.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        AdComponent,
        AdlistComponent,
        FormAccountComponent,
        YesCancelDialogComponent,
        ButtonUpImgAzureComponent,
        HashToArrayPipe
    ],
    providers: [
    ],
    entryComponents: [
        YesCancelDialogComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AdComponent,
        AdlistComponent,
        FormAccountComponent,
        YesCancelDialogComponent,
        ButtonUpImgAzureComponent,
        HashToArrayPipe
    ]
})
export class BaseModule { }
