import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestServiceService } from '../core/services/test-service/test-service.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { User } from '../core';
import { Answer } from '../core/models/answer';
import { Candidate } from '../core/models/candidate';
import { SolvedTest } from '../core/models/solvedTest';
import { SolvedTestServiceService } from '../core/services/solvedTest-service/solved-test-service.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit, OnDestroy {
  public test$: ReplaySubject<User[]>;
  private subscriptionTest: Subscription;
  private currentTest: number = 1;
  private testRunning = 0;
  private test;
  private answer=[];
  private candidate= new Candidate();
  private emailRecruiter="admin@admin.pt";
  private solvedTest = new SolvedTest();

  constructor(
    private testService: TestServiceService,
    private solvedService: SolvedTestServiceService) {
      this.test$ = this.testService.test$;
      this.subscriptionTest = this.test$.subscribe((a) => console.log('test$', JSON.stringify(a)));
     }

  ngOnInit() {
    // this.currentTest = this.testService.currentTest;
    console.log(this.currentTest);
    this.testService.getTest(this.currentTest);
    this.currentTestCheck();
    this.test$.subscribe(data=> {this.test=data; console.log("o meu teste");this.initiateAnswersObject(this.test)});
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

  initiateAnswersObject(test){
    let numberOfQuestions=test.questions.length;
    console.log(numberOfQuestions);
    for(let i=0; i<numberOfQuestions; i++){
        this.answer.push({questionID: test.questions[i].id, givenAnswer:[]});
    }
    console.log(this.answer);
  }

  onChange(indexSelection:number, indexQuestion:number, isChecked: boolean) {
    if(isChecked) {
      this.answer[indexQuestion].givenAnswer.push(indexSelection);
    } else {
      this.answer[indexQuestion].givenAnswer.splice(this.answer.indexOf(indexSelection),1);
    }
    console.log(this.answer[indexQuestion]);
  }

  submitTest(){
    this.candidate.emailRecruiter=this.emailRecruiter;
    this.solvedTest.answer=this.answer;
    this.solvedTest.candidate=this.candidate;
    this.solvedTest.timeSpent=10;
    this.solvedTest.testID=this.test.id;
    console.log(JSON.stringify(this.solvedTest));
    this.solvedService.addSolvedTest(this.solvedTest).subscribe(data=> console.log(data), error=>console.log(error.error));
    console.log("done");
  }

}
