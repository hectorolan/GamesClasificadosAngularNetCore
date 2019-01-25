import { Injectable } from '@angular/core';
import { IImageService } from '../iservices/iimageservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ImageService implements IImageService {

    constructor(private http: HttpClient) { }

    uploadImage(file: File, fileName: string): Promise<boolean> {
        let form = new FormData();
        form.append('Name', fileName);
        form.append('FileImage', file);
        return new Promise((resolve, reject) => {
            this.http.post<boolean>('api/images/upload/', form).subscribe(
                value => {
                    console.log(value);
                    resolve(value);
                },
                error => {
                    console.log(error);
                    resolve(false);
                }
            );
        });
    }

    uploadImageFromBase64(base64Img: String, fileName: string): Promise<boolean> {
        let form = new FormData();
        form.append('Name', fileName);
        form.append('Base64Img', base64Img+"");
        return new Promise((resolve, reject) => {
            this.http.post<boolean>('api/images/upload/', form).subscribe(
                value => {
                    console.log(value);
                    resolve(value);
                },
                error => {
                    console.log(error);
                    resolve(false);
                }
            );
        });
    }
}