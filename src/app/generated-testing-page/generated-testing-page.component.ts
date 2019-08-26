import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionServiceService } from '../core/services/session-service/session-service.service';
import { error } from '@angular/compiler/src/util';
import { Candidate } from '../core/models/candidate';
import { SolvedTest } from '../core/models/solvedTest';
import { SolvedTestServiceService } from '../core/services/solvedTest-service/solved-test-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generated-testing-page',
  templateUrl: './generated-testing-page.component.html',
  styleUrls: ['./generated-testing-page.component.scss']
})
export class GeneratedTestingPageComponent implements OnInit, OnDestroy {
  session: any = null;
  private testRunning: number;
  private test;
  private candidate= new Candidate();
  private solvedTest = new SolvedTest();
  private startTime;
  private finishTime;
  private optionLetter: string;
  private answer=[];
  private checked=[];
  private emailValid=true;
  letterArray = [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  p: number = 1;
  publicIP: string;
  Country: any;


  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionServiceService,
    private solvedService: SolvedTestServiceService,
    private http: HttpClient) {
    this.route.params.subscribe(
      params => {
        // tslint:disable-next-line: max-line-length
        this.sessionService.getSession(Number(params.id)).subscribe(
          data => 
          { this.session = data;
            console.log("session");
            console.log(this.session);
            this.testCheck();this.initiateAnswersObject(this.session);
            this.initiateCheckedObject(this.session); 
            console.log(this.session); },
          error => { this.testRunning = -1; })
      });

    /**
     * To read public IP
     */
    this.http.get('https://api.ipify.org?format=json').subscribe(data => {
      this.publicIP=data['ip']; console.log(data);  this.http.get('http://api.ipstack.com/'+ this.publicIP +'?access_key=acbb08b30d205f5018b80ebd45929e7a&fields=country_name').subscribe(country => {
        this.Country = country; console.log(country);
        })
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  testCheck() {
    if (this.session != null) {
      this.testRunning = 1;
    }

  }

  startTest() {
    console.log("começou o teste");
    console.log(this.session);
    if(this.session.candidateEmail!=this.candidate.email)
      this.emailValid=false;
    else{
      this.sessionService.beginSession(this.session.sessionID).subscribe(data => console.log(data), error=> console.log(error.error));
      this.startTime=new Date();
      this.testRunning = 2;
    }
  }

  initiateAnswersObject(session){
    let numberOfQuestions=session.test.questions.length;
    console.log(numberOfQuestions);
    for(let i=0; i<numberOfQuestions; i++){
        this.answer.push({questionID: session.test.questions[i].id, givenAnswer:[]});
    }
    console.log(this.answer);
  }
  
  initiateCheckedObject(session){
    let numberOfQuestions=session.test.questions.length;
    for(let question=0;question<numberOfQuestions; question++){
      let questionCheckbox=[];
      for(let option=0; option<session.test.questions[question].options.length; option++)
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

  submitTest(){
    this.finishTime=new Date();
    let secondsPassed=this.finishTime-this.startTime;
    console.log(secondsPassed);
    this.candidate.emailRecruiter=this.session.recruiterEmail;
    this.solvedTest.answer=this.answer;
    this.solvedTest.candidate=this.candidate;
    this.solvedTest.timeSpent=secondsPassed;
    this.solvedTest.testID=this.session.test.id;
    console.log(JSON.stringify(this.solvedTest));
    this.solvedService.addSolvedTestFromSession(this.solvedTest, this.session.sessionID).subscribe(data=> console.log(data), error=>console.log(error.error));
    console.log("done");
    this.testRunning = 3;
  }

  onFinished() {
    this.submitTest();
    this.testRunning = 3;
  }

  getLetter(j:number){
   return this.letterArray[j];
  }


}

 
