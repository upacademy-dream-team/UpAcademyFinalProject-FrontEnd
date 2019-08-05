import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isAdmin: boolean;
  accessType: string;

  constructor(
    private accountApi: UserServiceService
  ) { 
    this.accessType = accountApi.getAccessType();
  }

  ngOnInit() {
    this.isAdmin = this.accountApi.isAdmin();
  }

}
