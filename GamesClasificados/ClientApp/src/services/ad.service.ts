import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ad } from '../models/ad';
import { User } from '../models/user';
import { IDbContextAd } from '../iservices/idbcontextad';
import { Observable } from 'rxjs';

@Injectable()
export class AdService implements IDbContextAd {
  lastImageUploadedURL = '';

  constructor(private http: HttpClient) { }

  // From Interface
  getAd(key: number): Promise<Ad> {
    throw new Error("Method not implemented.");
  }
  getAds(consoleid: number, sectionid = 0): Promise<Ad[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Ad[]>('api/ads/console/' + consoleid + "/?sectionid=" + sectionid)
        .subscribe(
          value => {
            resolve(value);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }
  getAdsUser(user: User): Promise<Ad[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Ad[]>('api/ads/user/' + user.id)
        .subscribe(
          value => {
            resolve(value);
          },
          err => console.log(err)
        );
    });
  }
  getActiveAdsUser(user: User): Promise<Ad[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Ad[]>('api/ads/username/' + user.username + "?active=true")
        .subscribe(
          value => {
            resolve(value);
          },
          err => console.log(err)
        );
    });
  }
  saveAd(ad: Ad, adImageFile: File): Promise<Ad> {
    // Save the file/image to storage if file is not null
    if (adImageFile != null) {
      return Promise.resolve(
        this.uploadFile(adImageFile)
          .forEach((process: number) => { console.log(process); })
          .then(() => {
            ad.imageUrl = this.lastImageUploadedURL !== '' ? this.lastImageUploadedURL : ad.imageUrl;
            this.lastImageUploadedURL = '';
            return this.saveAd_ToDatabase(ad);
          })
      );
    }
    return this.saveAd_ToDatabase(ad);
  }
  setExpired(ads: Ad[], user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteAd(adId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete('api/ads/' + adId).subscribe(
        value => {
          resolve(true);
        },
        err => console.log(err)
      );
    });
  }

  // Internal functions
  private saveAd_ToDatabase(ad: Ad): Promise<Ad> {
    return new Promise((resolve, reject) => {
      this.http.post<Ad>(
        "api/Ads",
        this.getJsonForServer(ad),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).subscribe(
          value => resolve(value),
          error => console.log(JSON.stringify(error))
        );
    });
  }
  private getJsonForServer(ad: Ad): string {
    return JSON.stringify({
      ID: ad.id,
      Title: ad.title,
      OwnerId: ad.ownerId,
      Price: ad.price,
      ConsoleId: ad.consoleId,
      SectionId: ad.sectionId,
      ImageUrl: ad.imageUrl,
      Description: ad.description,
      DatePosted: ad.datePosted,
      Expired: ad.expired
    });
  }

  private manageExpiredAds(ads: Ad[], user: User): Ad[] {
    return []
  }
  private uploadFile(file: File): Observable<any> {
    return new Observable(observer => {
    });
  }

}
