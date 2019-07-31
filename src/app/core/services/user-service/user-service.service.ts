import { Injectable } from '@angular/core';
import { User } from '../../models';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
    private currentUser: User = new User();
  
    constructor() { }
  
    public isAuthenticated(): boolean {
      if (this.currentUser.id) {
        return true;
      } else {
        return false;
      }
    }
  
    public getCurrentId(): number {
      return this.currentUser.id;
    }
  
    public getCurrentName(): string {
      return this.currentUser.name;
    }
  
    public login(user: User): ReplaySubject<Account> {
      // Simulate Jax-rs Api request
      if (user.email === 'admin' && user.password === 'admin') {
        user.id = 1;
        user.name = 'Ze Carlos';
        this.currentUser = user;
      }
      const response: ReplaySubject<any> = new ReplaySubject(1);
      if (user.id) {
        response.next(user);
      } else {
        response.error({ msg: 'Deu erro' });
      }
      return response;
    }
  
    public logout() {
      this.currentUser = null;
    }
}
