import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../services/image.service';
import { EditImageDialogComponent } from '../dialogeditimage/edit-image-dialog.component';

@Component({
  selector: 'app-btn-upimg-azure',
  templateUrl: './button-upimg-azure.component.html',
  styleUrls: ['./button-upimg-azure.component.css']
})
export class ButtonUpImgAzureComponent implements OnInit {
  MAX_WIDTH_RESIZE: number = 500;
  loading: boolean = false;
  imageError: string = '';
  imageName: string = '';
  imageMessage: string = '';

  constructor(private imageService: ImageService,
    private matDialog: MatDialog,) { }
  formButton: any = null;

  ngOnInit() {
  }

  onChangeInputFile(inputFile: any, formButton: any) {
    this.formButton = formButton;
    this.imageError = '';
    if (inputFile &&
      inputFile.files &&
      inputFile.files[0]) {
      // Validate File
      let value: string = inputFile.value.toLowerCase();
      if (!value.endsWith('.png') &&
        !value.endsWith('.jpeg') &&
        !value.endsWith('.jpg')) {
        this.imageError = 'Only .png, .jpeg and .jpg images are allowed';
        formButton.reset();
        return true;
      }

      let file: File = inputFile.files[0];
      // File name  
      let fileName: number = new Date().getTime();
      let extension = value.split('.').pop();
      extension = extension === undefined ? '' : '.' + extension;
      this.imageName = fileName + extension;

      let result: String = this.processFile(file);
      return true;
    }
  }

  private resetUpload() {

  }

  private processFile(file: File): String {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    let MAX_WIDTH = this.MAX_WIDTH_RESIZE;
    let image: HTMLImageElement = document.createElement('img');

    // Put the image in an img element
    let context: ButtonUpImgAzureComponent = this;
    image.onload = function () {
      if (image.width > MAX_WIDTH) {
        image.height = MAX_WIDTH * (image.height / image.width);
        image.width = MAX_WIDTH;
      }

      let ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        context.editImage(canvas);
        // context.saveImgToStorage(null, canvas.toDataURL('image/jpeg'));
      }
    };

    if (FileReader && file) {
      var fr = new FileReader();
      fr.onload = function () {
        image.src = fr.result + '';
      }
      fr.readAsDataURL(file);
    }
    // Not supported
    else {
      //context.saveImgToStorage(file, "");
    }
    return "";
  }


  private editImage(canvas:HTMLCanvasElement) {
    let dialogRef: MatDialogRef<EditImageDialogComponent> = this.matDialog.open(EditImageDialogComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.imgSrc = canvas.toDataURL('image/jpeg');

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result['response'] === true) {
        // Save Image // Update Canvas
      }
    });
  }

  private saveImgToStorage(file: File | null, base64Img: String): boolean {
    if ((base64Img == '' || base64Img == null) && file != null) {
      //Use file
      if (file.size > 3500000) {
        this.imageError = 'Image too large';
        this.formButton.reset();
        return true;
      }
      // File is OK, Process it
      this.imageService.uploadImage(file, this.imageName).then((saved) => {
        if (!saved) {
          this.imageError = 'Error saving your image, try again';
          this.imageName = '';
        }
      });
    } else {
      // Use Base64String
      this.imageService.uploadImageFromBase64(base64Img, this.imageName).then((saved) => {
        if (!saved) {
          this.imageError = 'Error saving your image, try again';
          this.imageName = '';
        }
      })
    }
    if (this.imageName != '') {
      this.imageMessage = "Uploaded successful!";
    }
    return true;
  }
}
