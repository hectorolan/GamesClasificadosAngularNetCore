import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDbContextUserExists } from 'src/iservices/idbcontextuserexist';

@Injectable()
export class UserExistsService implements IDbContextUserExists {

  constructor(private http: HttpClient) { }

  // From Interface
  usernameExists(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (username != null && username != "") {
        this.http.get<boolean>("api/Users?username=" + username).subscribe(
          value => resolve(value),
          error => console.log(JSON.stringify(error))
        );
      } else {
        // For an empty username we will return that does not exists.
        // The user must be deleting the username
        resolve(false);
      }
    });
  }
}
