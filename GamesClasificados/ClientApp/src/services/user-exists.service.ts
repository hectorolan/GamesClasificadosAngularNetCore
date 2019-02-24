import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDbContextUserExists } from 'src/iservices/idbcontextuserexist';

@Injectable()
export class UserExistsService implements IDbContextUserExists {

  constructor(private http: HttpClient) { }

  // From Interface
  usernameExists(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<boolean>("api/Users?username=" + username).subscribe(
          value => resolve(value),
          error => console.log(JSON.stringify(error))
        )
      });
    }
}
