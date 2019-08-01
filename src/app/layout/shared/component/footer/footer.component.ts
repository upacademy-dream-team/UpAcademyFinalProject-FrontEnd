import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public name: string;
  constructor(
    private router: Router,
    private accountApi: UserServiceService
  ) {
    this.name = accountApi.getUserName();
  }

  ngOnInit() {
  }

}
