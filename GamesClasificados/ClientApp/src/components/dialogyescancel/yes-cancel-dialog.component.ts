import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-cancel-dialog',
  templateUrl: './yes-cancel-dialog.component.html',
  styleUrls: ['./yes-cancel-dialog.component.css']
})
export class YesCancelDialogComponent implements OnInit {

    message: string;

  constructor(
    public dialogRef: MatDialogRef<YesCancelDialogComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  closeSubmit(response: boolean) {
      this.dialogRef.close({ 'response': response });
  }

}
