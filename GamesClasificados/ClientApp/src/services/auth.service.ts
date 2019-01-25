import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { IAuthService } from '../iservices/iauthservice'

@Injectable()
export class AuthService implements IAuthService {
    // On Change log in User Observable/Sunject
    private onLogginEventMessage = new Subject<boolean>();
    public onLogginEvent$ = this.onLogginEventMessage.asObservable();
    // Main User
    public user = new User();
    private isLoggedIn = false;
    // If not logged in
    private redirectUrl: string;

    constructor(
        private router: Router,
        private http: HttpClient,
        private ngzone: NgZone) {
    }

    // From Interface
    /**
     *  If user is logged in, return true
        If not, ask to WebAPI for if logged in
        on the server side. If logged, return
        the User and log in the Client Side.
     */
    public isUserLoggedIn(): boolean {
       if (!this.isLoggedIn) {
            this.user == new User();
            this.onLogginEventMessage.next(false);
            this.http.get<string>("account/isloggedin").subscribe(
                response => {
                    if (response === "True") {
                        this.isLoggedIn = true;
                        this.http.get<User>("account/getuser").subscribe(
                            user => {
                                User.updateUserMethods(user);
                                this.user = user;
                                this.onLogginEventMessage.next(true);
                            },
                            err => console.log(JSON.stringify(err))
                        );
                    }
                },
                err => console.log(JSON.stringify(err)));
        }
        return this.isLoggedIn;
    }

}
