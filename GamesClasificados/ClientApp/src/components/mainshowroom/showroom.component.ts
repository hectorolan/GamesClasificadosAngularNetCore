import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Console } from '../../models/console';
import { Section } from '../../models/section';
import { IHashMap } from '../../imodels/ihashmap';
import { Ad } from '../../models/ad';
import { AdService } from '../../services/ad.service';
import { SectionService } from '../../services/section.service';
import { ConsoleService } from '../../services/console.service';

@Component({
    selector: 'app-showroom',
    templateUrl: './showroom.component.html',
    styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

    title = '';
    counter = '';
    consoleid: number = -1;
    sectionid: number = -1;
    adsEmitter: EventEmitter<Ad[]> = new EventEmitter();
    sections: IHashMap;
    consoles: IHashMap;

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
            this.sectionid = params['section'];
            this.setTitle();
            this.adService.getAds(this.consoleid, this.sectionid).then((ads) => {
                this.adsEmitter.next(ads);
                this.counter = ads.length + '';
            });
        });
    }

    ngOnInit_ifValidURL() {
        if (this.consoles[this.consoleid] === undefined) {
            this.router.navigate(['/games']);
            return false;
        } else if (this.sections[this.sectionid] === undefined) {
            this.router.navigate(['/games/' + this.consoleid]);
            return false;
        }
        return true;
    }

    // Private Methods
    private setConsolesSections(): void {
        if (ConsoleService.consoles) {
            this.consoles = ConsoleService.consoles;
        } else {
            this.consoleService.getConsoles().then(res => {
                this.consoles = res;
                this.setTitle();
            });
        }

        if (SectionService.sections) {
            this.sections = SectionService.sections;
        } else {
            this.sectionService.getSections().then(res => {
                this.sections = res;
                this.setTitle();
            });
        }
    }

    // Set the title, if something fail then check if the url parameters are ok.
    private setTitle(): void {
        if (this.consoles && this.consoleid != -1 && this.sections && this.sectionid != -1) {
            let console: string = this.consoles[this.consoleid];
            let section: string = this.sections[this.sectionid];
            this.title = console + ' / ' + section;
            this.ngOnInit_ifValidURL();
        }
    }
}
