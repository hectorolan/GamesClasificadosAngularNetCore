import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-userads',
  templateUrl: './userads.component.html',
  styleUrls: ['./userads.component.css']
})
export class UseradsComponent implements OnInit {
  showProfile: boolean = false;
  user: User = new User();
  adsEmitter: EventEmitter<Ad[]> = new EventEmitter();
  counter: number = 0;

  constructor(
    private route: ActivatedRoute,
    private adService: AdService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.user.username = params['id'];
      this.adService.getActiveAdsUser(this.user).then((ads) => {
        this.adsEmitter.next(ads);
        this.counter = ads.length;
        if (ads.length > 0) {
          let ad = ads[0];
          this.user.city = ad.city;
          this.user.telephone = ad.telephone;
          this.user.email = ad.email;
          this.user.name = ad.ownerName;
          this.user.preferedContactMethod = ad.preferedContactMethod;
          User.updateUserMethods(this.user);
          this.showProfile = true;
        }
      });
    });
  }

}
