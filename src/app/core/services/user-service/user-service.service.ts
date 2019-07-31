import { Injectable } from '@angular/core';
import { User } from '../../models';
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8080/Tetses-RecemLicensiados/api/user/login';

    private currentUser: User = new User();
  
    constructor(
      private http: HttpClient,
    ) { }
  
    public isAuthenticated(): boolean {
      if (this.currentUser.id) {
        return true;
      } else {
        return false;
      }
    }
  
    public getUserName(): string {
      return this.currentUser.username;
    }
  
    public login(user: any) {
      return this.http.get(this.apiUrl + "/" + user.username + "/" + user.password);
    }
  
    public logout() {
      this.currentUser = null;
    }
}
