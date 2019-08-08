import { Injectable } from '@angular/core';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

    private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/user/login/';

    // tslint:disable-next-line: variable-name
    private _currentUser: User = new User();

    constructor(
      private http: HttpClient,
    ) { }

    public isAuthenticated(): boolean {
      if (this._currentUser.id) {
        return true;
      } else {
        return false;
      }
    }

    public isAdmin(): boolean {
      if (this._currentUser.accessType === 'Admin') {
        return true;
      } else {
        return false;
      }
    }

    public getUserName(): string {
      return this._currentUser.username;
    }

    public getAccessType(): string {
      return this._currentUser.accessType;
    }

    public getLastLogin(): string {
      return this._currentUser.lastLogin;
    }
    public getemail(): string {
      return this._currentUser.email;
    }
    public login(user: any) {
      return this.http.get(this.apiUrl + user.username + '/' + user.password);
    }

    public logout() {
      this._currentUser = null;
    }

    public setCurrentUser(currentUser: any) {
      this._currentUser = currentUser;
    }

}
