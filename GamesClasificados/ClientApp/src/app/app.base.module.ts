import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Material Module import 
import { MaterialModule } from '../material.module';
// Shared Components
import { AdComponent } from '../components/ad/ad.component';
import { AdlistComponent } from '../components/adlist/adlist.component';
import { FormAccountComponent } from '../components/formaccount/form-account.component';
import { YesCancelDialogComponent } from '../components/dialogyescancel/yes-cancel-dialog.component';
import { EditImageDialogComponent } from 'src/components/dialogeditimage/edit-image-dialog.component';
import { ButtonUpImgAzureComponent } from '../components/buttonuploadimage/button-upimg-azure.component';
// Pipes
import { HashToArrayPipe } from '../pipes/hashtoarray.pipe';






@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: [
    AdComponent,
    AdlistComponent,
    FormAccountComponent,
    YesCancelDialogComponent,
    EditImageDialogComponent,
    ButtonUpImgAzureComponent,
    HashToArrayPipe
  ],
  providers: [
  ],
  entryComponents: [
    YesCancelDialogComponent,
    EditImageDialogComponent
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
