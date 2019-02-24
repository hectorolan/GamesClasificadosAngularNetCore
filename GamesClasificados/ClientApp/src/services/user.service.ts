import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { IDbContextUser } from '../iservices/idbcontextuser';

@Injectable()
export class UserService implements IDbContextUser {

  constructor(private http: HttpClient) { }

  // From Interface
  getUser(userId: string): Promise<User> {
    let user: User = new User();
    user.name = userId;
    return Promise.resolve(new User());
  }
  saveUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>("api/Users", user).subscribe(
        value => resolve(value),
        error => console.log(JSON.stringify(error))
      )
    });
  }
  create(user: User): Promise<boolean> {
    return Promise.resolve(false);
  }
  createUserPassword(email: string, password: string): Promise<boolean> {
    return Promise.resolve(false);
  }
  deleteUser(userId: number, router: Router) {
    let url: string = '/api/Users/Delete/' + userId;
    window.location.href = url;
  }

  //Other
  getUserUid(): number {
    return 0;
  }
  getUserEmail(): string {
    return "";
  }
  sendEmailVerification(): Promise<any> {
    return Promise.resolve();
  }
}
