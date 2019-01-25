import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { IHashMap } from '../../imodels/ihashmap';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';
import { SectionService } from '../../services/section.service';
import { ConsoleService } from '../../services/console.service';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
    consoles: IHashMap;
    sections: IHashMap;
    consoleid: number = 0;
    sectionid: number = 0;
    id: number;
    ad: Ad;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adService: AdService,
        private sectionService: SectionService,
        private consoleService: ConsoleService
    ) { }

    ngOnInit() {
        this.setConsolesSections();
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.consoleid = params['console'];
            this.sectionid = params['section'];
            this.ngOnInit_ifValidURL(params);
        });
    }

    ngOnInit_ifValidURL(params: Params): Promise<boolean> {
        if (this.consoleid === 0) {
            // console not valid
            this.router.navigate(['/games']);
            return Promise.resolve(false);
        } else if (this.sectionid === 0) {
            // section not valid
            this.router.navigate(['/games/' + params['console']]);
            return Promise.resolve(false);
        } else if (this.id === null) {
            // id not valid
            this.router.navigate(['/games/' + params['console'] + '/' + params['section']]);
            return Promise.resolve(false);
        }
        this.adService.getAd(this.id).then((ad) => {
            if (!this.checkIfValidAd(ad, params)) {
                this.router.navigate(['/games/' + params['console'] + '/' + params['section']]);
                return false;
            } else {
                this.ad = ad;
                return true;
            }
        });
        return Promise.resolve(true);
    }

    checkIfValidAd(ad: Ad, params: Params): boolean {

        return true;
    }

    // Private Methods
    private setConsolesSections(): void {
        if (ConsoleService.consoles) {
            this.consoles = ConsoleService.consoles;
        } else {
            this.consoleService.getConsoles().then(res => this.consoles = res);
        }
        if (SectionService.sections) {
            this.sections = SectionService.sections;
        } else {
            this.sectionService.getSections().then(res => this.sections = res);
        }
    }
}
