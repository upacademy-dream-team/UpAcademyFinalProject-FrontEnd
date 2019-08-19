import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestServiceService } from '../core/services/test-service/test-service.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { User } from '../core';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit, OnDestroy {
  public test$: ReplaySubject<User[]>;
  private subscriptionTest: Subscription;
  private currentTest: number;
  private currentRecruiter: string;
  private testRunning = 0;
  private test;

  constructor(
    private testService: TestServiceService) {
      this.test$ = this.testService.test$;
      this.subscriptionTest = this.test$.subscribe((a) => console.log('test$', JSON.stringify(a)));
     }

  ngOnInit() {
    this.currentTest = this.testService.getCurrentTest();
    this.currentRecruiter = this.testService.getCurrentRecruiter();
    this.testService.getTest(this.currentTest);
    this.currentTestCheck();
    this.test$.subscribe(data =>{this.test = data;});
  }

  ngOnDestroy() {
    this.subscriptionTest.unsubscribe();
  }

  currentTestCheck() {
      if ( this.currentTest !== 0) {this.testRunning = 1; }
  }

  startTest() {
    this.testRunning = 2;
  }
}
