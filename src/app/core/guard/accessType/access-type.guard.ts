import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class AccessTypeGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountApi: UserServiceService
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.accountApi.isAdmin()){
      return true
    } else {
      this.router.navigate(['']);
    } 
  }
}
