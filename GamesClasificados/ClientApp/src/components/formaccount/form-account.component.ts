import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserExistsService } from '../../services/user-exists.service';
import { YesCancelDialogComponent } from '../dialogyescancel/yes-cancel-dialog.component';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.css']
})
export class FormAccountComponent implements OnInit {
  @Input()
  user: User;
  accountSettingForm: FormGroup;
  accountUserForm: any = {
    'name': '',
    'email': '',
    'telephone': '',
    'city': '',
    'country': ''
  };

  @Output() saveSubmit = new EventEmitter<{ [key: string]: any }>();
  @Output() deleteAccountSubmit = new EventEmitter<{ [key: string]: any }>();

  active = true;
  processing = false;
  formErrors: any = {
    'requiredData': ''
  };

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userExistsService: UserExistsService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.accountUserForm['name'] = this.user.name != null ? this.user.name : '';
    this.accountUserForm['email'] = this.user.email != null ? this.user.email : '';
    this.accountUserForm['telephone'] = this.user.telephone != null ? this.user.telephone : '';
    this.accountUserForm['city'] = this.user.city != null ? this.user.city : '';
    this.accountUserForm['country'] = this.user.country != null ? this.user.country : '';
    let prefMethods: string[] = this.user.preferedContactMethod == null ? ",,".split(',') : this.user.preferedContactMethod.split(',');
    this.accountSettingForm = this.formBuilder.group({
      'showEmail': [this.user.showEmail],
      'showTelephone': [this.user.showPhone],
      'methodText': [this.user.methodTextMessage],
      'methodCall': [this.user.methodCall],
      'methodEmail': [this.user.methodEmail],
      'username': [this.user.username]
    });
    this.accountSettingForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages now
  }

  onSubmit() {
    if (!this.processing) {
      this.processing = true;
    } else {
      return false;
    }
    // Validate Data
    let semail = this.accountSettingForm.get('showEmail');
    let stelephone = this.accountSettingForm.get('showTelephone');
    let mtext = this.accountSettingForm.get('methodText');
    let mcall = this.accountSettingForm.get('methodCall');
    let memail = this.accountSettingForm.get('methodEmail');
    let username = this.accountSettingForm.get('username');

    let preferedContactMethod: string = mtext.value +
      ',' + mcall.value +
      ',' + memail.value;

    if (this.user.showEmail === semail.value &&
      this.user.showPhone === stelephone.value &&
      this.user.methodCall === mcall.value &&
      this.user.methodEmail === memail.value &&
      this.user.methodTextMessage === mtext.value &&
      this.user.preferedContactMethod === preferedContactMethod &&
      this.user.username == username.value) {
      // No Changes
      this.processing = false;
      return false;
    }

    if (semail === null || stelephone === null || mtext === null || mcall === null || memail === null) {
      this.formErrors['requiredData'] = `Something went wrong, please refresh the page.`;
      this.processing = false;
      return false;
    }
    if (semail.value === false && stelephone.value === false) {
      this.formErrors['requiredData'] = `Please have an available contact 
        method: \'Show email\' or \'Show phone\'.`;
      this.processing = false;
      return false;
    }
    // Check if username exists
    this.userExistsService.usernameExists(username.value).then((exists: boolean) => {
      if (exists) {
        this.formErrors['requiredData'] = `The username already exist.`;
        this.processing = false;
        return false;
      } else {
        // Update User Object
        this.user.showEmail = semail.value;
        this.user.showPhone = stelephone.value;
        this.user.methodCall = mcall.value;
        this.user.methodEmail = memail.value;
        this.user.methodTextMessage = mtext.value;
        this.user.preferedContactMethod = preferedContactMethod;
        this.user.username = username.value;
        let response = {
          'user': this.user
        };
        // Call parent to save User
        this.saveSubmit.emit(response);
        this.snackBar.open('Saved', '', {
          duration: 600
        });
        this.processing = false;
      }
    });
  }

  deleteAccount() {
    let dialogRef: MatDialogRef<YesCancelDialogComponent> = this.matDialog.open(YesCancelDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.message = 'Are you sure? (Your account will be deleted and your data cannot be recovered.)';
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result['response'] === true) {
        // Delete User

        let response = {
          'userid': this.user.id
        };
        this.snackBar.open('Deleted', '', {
          duration: 600
        });
        this.deleteAccountSubmit.emit(response);
      }
    });
  }

  cancelChanges() {
    this.buildForm();
    return false;
  }

  onValueChanged(data?: any) {
    if (!this.accountSettingForm) {
      return;
    }
    this.formErrors['requiredData'] = '';
  }
}
