import { Component, OnInit, EventEmitter } from '@angular/core';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';


// HOME PAGE ON MAIN SITE
@Component({
  selector: 'app-consoles',
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.css']
})
export class ConsolesComponent implements OnInit {

  title: string = '';
  adsEmitter: EventEmitter<Ad[]> = new EventEmitter();
  counter: number = 0;

  constructor(private adService: AdService) { }

  ngOnInit() {
    /*this.adService.getAds(0).then((ads: Ad[]) => {
      this.adsEmitter.next(ads);
      this.counter = ads.length;
    });*/
  }
}
