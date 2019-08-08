import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  accessType: string;
  name: string;
  email: string;
  ultimoLogin: string;


  constructor(
    private router: Router,
    private accountApi: UserServiceService
  ) {
    this.name = accountApi.getUserName();
    this.accessType = accountApi.getAccessType();
    this.email = accountApi.getemail();
    this.ultimoLogin = accountApi.getLastLogin();
  }

  ngOnInit() {
  }




}
