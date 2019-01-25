import { Component, OnInit, HostListener } from '@angular/core';
import { TogglenavService } from '../../services/togglenav.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GAMES Clasificados';
  onLoginChangeSubscription: Subscription;
  isLoggedIn = false;

  constructor(private authService: AuthService,
    public tooglenavService: TogglenavService) {
    this.tooglenavService.toggle();
    this.onLoginChangeSubscription = this.authService.onLogginEvent$.subscribe(logged => {
      this.isLoggedIn = logged;
      // this.username = this.authService.user.name != null && this.authService.user.name !== '' ? this.authService.user.name : 'Account';
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  toggleNav() {
    this.tooglenavService.toggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.tooglenavService.onResize(event);
  }
}
