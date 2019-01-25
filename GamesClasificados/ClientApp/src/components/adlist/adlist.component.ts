import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Ad } from '../../models/ad';
import { MatButtonToggleGroup, MatButtonToggleChange } from '@angular/material';

@Component({
    selector: 'app-adlist',
    templateUrl: './adlist.component.html',
    styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {
    @Input()
    adsEmitter: EventEmitter<Ad[]>;
    @ViewChild('pagesToggle1')
    pagesToggle1: MatButtonToggleGroup;
    @ViewChild('pagesToggle2')
    pagesToggle2: MatButtonToggleGroup;

    ads: Ad[];
    adsToShow: Ad[];
    pages: number = 0;
    pagesArray: number[] = new Array();
    selectedPage: number = 1;
    itemsPerPage: number = 10;
    
    constructor(){ }

    ngOnInit() {
        this.adsEmitter.subscribe((ads: Ad[]) => {
            this.pages = 0;
            this.ads = ads;
            this.adsToShow = new Array<Ad>();
            this.pagesArray = new Array<number>();

            if (ads.length > 0) {
                this.pages = Math.ceil(ads.length / 10);
                for (let i = 1; i <= this.pages; i++) {
                    this.pagesArray.push(i);
                }
                // Set first page
                let endIndex: number = ads.length > this.itemsPerPage ? this.itemsPerPage : ads.length;
                this.adsToShow = ads.slice(0, endIndex);
            }
        });
    }

    private pageToggleChange(event: MatButtonToggleChange) {
        let page: number = event.value;
        this.pagesToggle1.value = page;
        this.pagesToggle2.value = page;

        let startIndex: number = (page - 1) * this.itemsPerPage;
        let endIndex: number = page * this.itemsPerPage;
        this.adsToShow = this.ads.slice(startIndex, endIndex);
    }
}
