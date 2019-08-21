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
  private currentTest: number;
  private currentRecruiter: string;
  private testRunning = 0;
  private test;
  private answer=[];
  private candidate= new Candidate();
  private emailRecruiter="admin@admin.pt";
  private solvedTest = new SolvedTest();
  private startTime;
  private finishTime;
  private checked=[];
  private myCheck=false;
  private optionLetter: string;
  letterArray = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z' ]
  p: number = 1;


  constructor(
    private testService: TestServiceService,
    private solvedService: SolvedTestServiceService) {
      this.test$ = this.testService.test$;
      this.subscriptionTest = this.test$.subscribe((a) => console.log('test$', JSON.stringify(a)));
     }

  ngOnInit() {
    this.currentTest = this.testService.getCurrentTest();
    this.currentRecruiter = this.testService.getCurrentRecruiter();
    this.testService.getTest(this.currentTest);
    this.currentTestCheck();
    this.test$.subscribe(data=> {this.test=data; console.log("o meu teste");this.initiateAnswersObject(this.test); this.initiateCheckedObject(this.test)});
  }

  ngOnDestroy() {
    this.subscriptionTest.unsubscribe();
  }

  currentTestCheck() {
      if ( this.currentTest !== 0) {this.testRunning = 1; }
  }

  startTest() {
    this.startTime=new Date();
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

  initiateCheckedObject(test){
    let numberOfQuestions=test.questions.length;
    for(let question=0;question<numberOfQuestions; question++){
      let questionCheckbox=[];
      for(let option=0; option<test.questions[question].options.length; option++)
        questionCheckbox.push(false);
      this.checked.push(questionCheckbox);
    }
    console.log(this.checked);
  }

  onChange(indexSelection:number, indexQuestion:number, isChecked: boolean) {
    if(isChecked) {
      this.answer[indexQuestion].givenAnswer.push(indexSelection);
      this.checked[indexQuestion][indexSelection]=true;
    } else {
      this.answer[indexQuestion].givenAnswer.splice(this.answer[indexQuestion].givenAnswer.indexOf(indexSelection),1);
      this.checked[indexQuestion][indexSelection]=false;
    }
    console.log(this.checked);
    console.log(this.answer[indexQuestion]);

  }
  print(){
    console.log(this.checked);
  }

  submitTest(){
    this.finishTime=new Date();
    let secondsPassed=this.finishTime-this.startTime;
    console.log(secondsPassed);
    this.candidate.emailRecruiter=this.emailRecruiter;
    this.solvedTest.answer=this.answer;
    this.solvedTest.candidate=this.candidate;
    this.solvedTest.timeSpent=secondsPassed;
    this.solvedTest.testID=this.test.id;
    console.log(JSON.stringify(this.solvedTest));
    this.solvedService.addSolvedTest(this.solvedTest).subscribe(data=> console.log(data), error=>console.log(error.error));
    console.log("done");
  }

  onFinished() {
    this.submitTest();
  }

  getLetter(j:number){
    return this.letterArray[j];
  }
  
}
