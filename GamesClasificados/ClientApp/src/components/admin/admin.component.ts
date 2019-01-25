import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TogglenavService } from '../../services/togglenav.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
    togglenavSubscription: Subscription;
    @ViewChild('navpanel') navpanel: ElementRef;
    // Accounts Name
    accountName = '';

    constructor(
        private authService: AuthService,
        private rd: Renderer,
        private router: Router,
        public togglenavService: TogglenavService) {
        this.togglenavSubscription = this.togglenavService.togglerNav$.subscribe(() => {
            this.rd.invokeElementMethod(this.navpanel, 'toggle');
        });
    }

    ngOnInit() {
        this.accountName = this.authService.user.name != null && this.authService.user.name !== '' ? this.authService.user.name : 'Account';
    }

    ngOnDestroy() {
        this.togglenavSubscription.unsubscribe();
    }

    logout() {
    }

    onMenuSelected() {
        if (window.innerWidth <= this.togglenavService.mobileSize) {
            this.rd.invokeElementMethod(this.navpanel, 'close');
        }
    }
}
