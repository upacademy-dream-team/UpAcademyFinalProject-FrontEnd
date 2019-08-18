import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {

  page = 30;

  constructor() { }

  ngOnInit() {
  }

}
