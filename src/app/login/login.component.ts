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

  constructor(
    private router: Router,
    private accountApi: UserServiceService
  ) {
    // Fill email and password
    this.user.email = 'admin';
    this.user.password = 'admin';
  }

  ngOnInit() {
  }

  public login() {
    this.accountApi.login(this.user).subscribe(
      (user: any) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(this.msg = error.msg);
      }
    );
  }

}
