import { Component, OnInit, Inject, ViewChild, AfterViewInit  } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-edit-image-dialog',
  templateUrl: './edit-image-dialog.component.html',
  styleUrls: ['./edit-image-dialog.component.css']
})
export class EditImageDialogComponent implements OnInit, AfterViewInit  {
  //Cropper: any;
  // this.image.nativeElement.value
  message: string;
  cropperImage: Cropper;

  constructor(
    private dialogRef: MatDialogRef<EditImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imgSrc: string,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let image: HTMLImageElement = <HTMLImageElement> document.getElementById('image');
    this.cropperImage = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 3,
    });
  }

  closeSubmit(response: any) {
    this.dialogRef.close({ 'response': null });
  }

}
