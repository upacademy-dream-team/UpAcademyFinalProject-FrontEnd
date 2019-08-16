import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../core/services/test-service/test-service.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {
  private currentTest: number = 1;
  private testRunning = true;
  constructor(
    private testService: TestServiceService) {
      this.currentTest = testService.currentTest;
     }

  ngOnInit() {
  }

}
