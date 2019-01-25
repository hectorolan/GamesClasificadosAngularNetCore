import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TogglenavService {
    // When open/close icon pressed
    private togglerNavSource = new Subject<void>();
    togglerNav$ = this.togglerNavSource.asObservable();
    // When windows resize
    private resizerSource = new Subject<void>();
    resizedWindow$ = this.resizerSource.asObservable();
    // The init values are for desktop full screen
    showNavToggleBtn: boolean = false;
    initOpened = true;
    navMode = 'side';
    mobileSize = 600;

    constructor() {
        if (window.innerWidth <= this.mobileSize) {
            // Set for mobile
            this.showNavToggleBtn = true;
            this.initOpened = false;
            this.navMode = 'push';
        }
    }

    toggle() {
        this.togglerNavSource.next();
    }

    /*
    The app.component.ts is in charge
    to monitor the on resize event
    */
    onResize(event: any) {
        console.log(window.innerWidth);
        if (window.innerWidth <= this.mobileSize) {
            // Set for mobile
            this.showNavToggleBtn = true;
            this.initOpened = false;
            this.navMode = 'push';
        } else {
            this.showNavToggleBtn = false;
            this.initOpened = true;
            this.navMode = 'side';
        }
    }
}
