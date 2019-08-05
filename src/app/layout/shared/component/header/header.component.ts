import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/core';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public name: string;
  public accessType: string;
  public isAdmin: boolean;

  constructor(
    private router: Router,
    private accountApi: UserServiceService
  ) {
    this.name = accountApi.getUserName();
    this.accessType = accountApi.getAccessType();
  }

  ngOnInit() {
    this.isAdmin = this.accountApi.isAdmin();
  }

  public logout() {
    this.accountApi.logout();
    this.router.navigate(['/login']);
  }

}
