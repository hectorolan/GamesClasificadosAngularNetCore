import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-email-dialog',
  templateUrl: './get-email-dialog.component.html',
  styleUrls: ['./get-email-dialog.component.css']
})
export class GetEmailDialogComponent implements OnInit {
  getEmailForm: FormGroup;
  active = true;
  changeEmailData: any = {
    'email': '',
    'password': ''
  };
  formErrors: any = {
    'email': '',
    'password': ''
  };
  validationMessages: any = {
    'email': {
      'required': 'Email is required.'
    },
    'password': {
      'required':   'Password is required.',
      'minlength':  'Password must be at least 6 characters long.'
    }
  };

  constructor(
    public dialogRef: MatDialogRef<GetEmailDialogComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.getEmailForm = this.formBuilder.group({
      'email': [this.changeEmailData.email, [
        Validators.required
      ]],
      'password': [this.changeEmailData.password, [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
    this.getEmailForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.getEmailForm) {
      return;
    }
    const form = this.getEmailForm;

    for (const field in this.getEmailForm.controls) {
      if (this.getEmailForm.contains(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            if (control.errors !== null) {
                for (const key in control.errors) {
                    if (messages[key] !== '') {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
      }
    }
  }

  closeSubmit() {
    this.changeEmailData.email = this.getEmailForm.controls['email'].value;
    this.changeEmailData.password = this.getEmailForm.controls['password'].value;
    this.dialogRef.close({
      'email': this.changeEmailData.email,
      'password': this.changeEmailData.password
    });
  }

}
