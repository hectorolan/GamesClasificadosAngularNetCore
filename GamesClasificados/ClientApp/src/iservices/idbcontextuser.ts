import { Ad } from '../models/ad';
import { User } from '../models/user';
import { Router } from '@angular/router';

export interface IDbContextUser {
  getUser(userId: string): Promise<User>;
  saveUser(user: User): Promise<User>;
  create(user: User): Promise<boolean>;
  createUserPassword(email: string, password: string): Promise<boolean>;
  deleteUser(userId: number, router: Router): void;
}
