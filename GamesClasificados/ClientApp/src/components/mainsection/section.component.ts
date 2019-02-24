import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IHashMap } from '../../imodels/ihashmap';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';
import { SectionService } from '../../services/section.service';
import { ConsoleService } from '../../services/console.service';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

    title = '';
    counter = '';
    sectionsCounter: { [key: number]: string; } = {};
    consoleid: number;
    adsEmitter: EventEmitter<Ad[]> = new EventEmitter();
    consoles: IHashMap;
    sections: IHashMap;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adService: AdService,
        private sectionService: SectionService,
        private consoleService: ConsoleService) { }

    ngOnInit() {
        this.setConsolesSections();
        this.route.params.subscribe((params: Params) => {
            this.consoleid = params['console'];
            this.ngOnInit_ifValidURLSetTitle();

            this.adService.getAds(this.consoleid).then((ads) => {
                this.adsEmitter.next(ads);
                this.counter = ads.length + '';
                for (let section in this.sections) {
                    this.sectionsCounter[+section] = this.getCountFiteringSection(ads, +section);
                }
            });
        });
    }

    ngOnInit_ifValidURLSetTitle() {
        if (this.consoles && this.consoleid) {
            this.title = this.consoles[this.consoleid];
            if (this.title === undefined) {
                // console not valid
                this.router.navigate(['/games']);
            }
        }
    }

    getCountFiteringSection(ads: Ad[], section: number): string {
        return ads.filter(ad => ad.sectionId === section).length + '';
    }

    keys(dictionary: any): Array<string> {
        return Object.keys(dictionary);
    }

    // Private Methods
    private setConsolesSections(): void {
        if (ConsoleService.consoles) {
            this.consoles = ConsoleService.consoles;
        } else {
            this.consoleService.getConsoles().then(res => {
                this.consoles = res;
                this.ngOnInit_ifValidURLSetTitle();
            });
        }
        if (SectionService.sections) {
            this.sections = SectionService.sections;
        } else {
            this.sectionService.getSections().then(res => {
                this.sections = res;
                this.ngOnInit_ifValidURLSetTitle();
            });
        }
    }

}
