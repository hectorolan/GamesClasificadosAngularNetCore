import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-myads',
    templateUrl: './myads.component.html',
    styleUrls: ['./myads.component.css']
})
export class MyadsComponent implements OnInit {
    adsEmitter: EventEmitter<Ad[]> = new EventEmitter();
    counter = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adService: AdService,
        private authService: AuthService) { }

    ngOnInit() {
        let user = this.authService.user;
        this.adService.getAdsUser(this.authService.user).then((ads) => {
            ads.forEach(ad => {
                ad.city = user.city;
                ad.telephone = user.telephone;
                ad.ownerName = user.name;
                ad.email = user.email;
                ad.preferedContactMethod = user.preferedContactMethod;
            });
            ads = ads.sort((ad1, ad2) => {
                if (ad1.expired === ad2.expired) {
                    return 0;
                }
                return ad1.expired === true ? 1 : -1;
            });
            this.adsEmitter.next(ads);
            this.counter = ads.length + '';
        });
    }

}
