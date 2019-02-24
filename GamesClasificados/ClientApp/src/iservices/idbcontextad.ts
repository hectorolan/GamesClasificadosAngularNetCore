import { Ad } from '../models/ad';
import { User } from '../models/user'

export interface IDbContextAd {
  getAd(key: number): Promise<Ad>;
  getAds(systemConsole: number, section: number): Promise<Ad[]>;
  getAdsUser(user: User): Promise<Ad[]>;
  getActiveAdsUser(user: User): Promise<Ad[]>;
  saveAd(ad: Ad, adImageFile: File): Promise<Ad>;
  setExpired(ads: Ad[], user: User): Promise<boolean>;
  deleteAd(adId: number): Promise<boolean>;
}
