import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Console } from '../../models/console';
import { IHashMap } from '../../imodels/ihashmap';
import { AuthService } from '../../services/auth.service';
import { ConsoleService } from '../../services/console.service';
import { TogglenavService } from '../../services/togglenav.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
    togglenavSubscription: Subscription;
    consoles: IHashMap;
    @ViewChild('navpanel') navpanel: ElementRef;

    constructor(private rd: Renderer,
        public togglenavService: TogglenavService,
        private consoleService: ConsoleService) {
        this.togglenavSubscription = this.togglenavService.togglerNav$.subscribe(() => {
            this.rd.invokeElementMethod(this.navpanel, 'toggle');
        });
    }

    ngOnInit() {
        this.setConsolesSections();
    }

    ngOnDestroy() {
        this.togglenavSubscription.unsubscribe();
    }

    keys(dictionary: any): Array<string> {
        return Object.keys(dictionary);
    }

    onMenuSelected() {
        if (window.innerWidth <= this.togglenavService.mobileSize) {
          this.rd.invokeElementMethod(this.navpanel, 'close');
        }
    }

    // Private Methods
    private setConsolesSections(): void {
        if (ConsoleService.consoles) {
            this.consoles = ConsoleService.consoles;
        } else {
            this.consoleService.getConsoles().then(res => this.consoles = res);
        }
    }
}
