import { Component, OnInit } from '@angular/core';
import { User } from '../core/models';
import { Router } from '@angular/router';

import { UserServiceService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public msg: string;
  public check: number;

  constructor(
    private router: Router,
    private accountApi: UserServiceService
  ) {
    // Fill email and password
    this.user.username = 'joao';
    this.user.password = 'drmDvUgQ6Xmx3g==';
  }

  ngOnInit() {
  }

  public login() {
    this.accountApi.login(this.user).subscribe(
      (data: any) => {
        console.log(data);
        this.accountApi.setCurrentUser(data);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(this.msg = error.msg);
        this.check = 1 ;
      }
    );
  }

  public checkReset() {
    this.check = 0;
  }

}
