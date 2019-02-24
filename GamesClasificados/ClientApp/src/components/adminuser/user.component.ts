import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Ad } from '../../models/ad';
import { FormAccountComponent } from '../formaccount/form-account.component';
import { YesCancelDialogComponent } from '../dialogyescancel/yes-cancel-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Child component info
  @ViewChild(FormAccountComponent)
  private accountFormComponent: FormAccountComponent;
  user: User = new User();

  // Confirmation dialog
  dialogRef: MatDialogRef<YesCancelDialogComponent>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.user;
  }

  saveSubmit(data: { [key: string]: any }) {
    this.user = data['user'];
    this.userService.saveUser(this.user).then(() => {
    });
  }

  deleteAccountSubmit(data: { [key: string]: any }) {
    this.userService.deleteUser(data['userid'], this.router);
  }
}
