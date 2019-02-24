import { Ad } from '../models/ad';
import { User } from '../models/user';
import { Router } from '@angular/router';

export interface IDbContextUserExists {
  usernameExists(username: string): Promise<boolean>;
}
