import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
  }

  saveSubmit(data: {[key: string]: any}) {
    this.user = data['user'];
    this.userService.createUserPassword(data['email'], data['password'])
    .then(() => {
        if (this.userService.getUserUid() !== 0) {
            this.user.id = this.userService.getUserUid();
        this.userService.saveUser(this.user);
      }
    });
  }
}
