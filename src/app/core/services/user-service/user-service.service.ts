import { Injectable } from '@angular/core';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

    private apiUrl = 'http://localhost:8080/Testes-RecemLicenciados/api/user/';

    // tslint:disable-next-line: variable-name
    private _currentUser: User = new User();
    public users$: ReplaySubject<any[]> = new ReplaySubject(1);
    private users: any[];

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
      return this.http.get(this.apiUrl + 'login/' + user.username + '/' + user.password);
    }

    public addUser(user: User) {
      console.log(user);
      return this.http.post(this.apiUrl + 'add', user);
    }

    public logout() {
      this._currentUser = null;
    }

    public setCurrentUser(currentUser: any) {
      this._currentUser = currentUser;
    }
    public getAllUsers(){
      return this.http.get(this.apiUrl+"/all").subscribe(
        (res: any) => {
          this.users = res;
          this.users$.next(res);
        }
      );
    }


    public resetPassword(user: User) {
      return this.http.put(this.apiUrl + 'resetPassword', user);
    }

    public editUser(user: User){
      return this.http.put(this.apiUrl + 'edit', user);
    }

    public removeUser(id: Number){
      return this.http.delete(this.apiUrl + 'remove/' + id);
    }

    public updaterPassword(username: String, oldPassword: String, newPassword: String){
      return this.http.put(this.apiUrl+"changePassword/"+username+"/"+oldPassword+"/"+newPassword,{});
    }
}
