import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {NgbTabsetConfig, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { Test } from 'src/app/core/models/test';
import { Category } from 'src/app/core/models/category';
import { ReplaySubject, Subscription } from 'rxjs';
import { CategoryServiceService } from 'src/app/core/services/category-service/category-service.service';
import { Question } from 'src/app/core/models/question';
import { QuestionServiceService } from 'src/app/core/services/question-service/question-service.service';
import { UserServiceService } from 'src/app/core';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'app-criar-testes',
  templateUrl: './criar-testes.component.html',
  styleUrls: ['./criar-testes.component.scss'],
  providers: [NgbTabsetConfig]
})
export class CriarTestesComponent implements OnInit, OnDestroy {

  
  public categories$: ReplaySubject<Category[]>;
  public randomQuestions$: ReplaySubject<Question[]>;
  public allRandomQuestions=[];
  public allCategories=[];
  private subscriptionCategories: Subscription;
  public categories;
  public numberOfTimes: number[]=[];
  public options: any[]=[];
  public solution: any[]=[];
  maximum: any;

  constructor(config: NgbTabsetConfig, private testService: TestServiceService, private userService: UserServiceService, private categoryService: CategoryServiceService, private questionService: QuestionServiceService) {
    config.justify = 'center';
    config.type = 'pills';
    this.categories$ = this.categoryService.categories$;
    this.randomQuestions$ = this.questionService.randomQuestions$;

    this.subscriptionCategories = this.categories$.subscribe((a) => console.log('categories$', JSON.stringify(a)));
  }

  ngOnInit() {
    this.categoryService.getAllCategories();
    //console.log(this.categories);
    //console.log(this.subscriptionCategories);
    this.categories$.subscribe(data => this.categories=data);
  }

  ngOnDestroy(){
    this.subscriptionCategories.unsubscribe();
  }

  private numberOfQuestions: number;
  private category: any;
  private categoryWithNumber: any;
  private timer: number;
  private testName: string;
  private questions: Question[];
  private questionFormValidity: boolean= false;
  test= new Test();
  private firstCheck: boolean= false;

  show(){
    console.log(this.categoryWithNumber.numberOfQuestions);
  }

  public checkValidityQuestion(){
    console.log(this.options);
    console.log(this.solution);
    for(let i=0; i<this.options.length; i++)
      if(this.options[i]=="" || this.options[i]==null)
        {this.questionFormValidity=false; return;}
    this.questionFormValidity=true;
    return;
  }
  

  ///adding category
  categoryString : string;
  categoryClass = new Category();

  ///adding question
  questionString: string;
  questionClass= new Question();

  public showMessage(){
    console.log("tem de inserir solução")
  }

  public addInfo(){
    console.log(this.categories);
    this.allCategories.push(this.category);
    this.categoryService.getAllCategories();
    this.questionService.getRandomQuestions(this.category,this.numberOfQuestions).subscribe(
      (res: any) => {
        this.allRandomQuestions.push(...res);
        this.randomQuestions$.next(this.allRandomQuestions);
       // this.allRandomQuestions=[...this.allRandomQuestions, ...res];
        console.log( this.allRandomQuestions);
      }
    );

    this.numberOfQuestions=0;
    this.category="";
    this.maximum=0;
    return this.categories$.subscribe(/*data=> console.log(data)*/);
  }

  public getNumberOfQuestionsByCategory(){
    console.log("entrou aqui");
    console.log(this.category);
    for(let i=0; i<this.categories.length; i++)
      if(this.categories[i].category.category==this.category)
       this.maximum=this.categories[i].numberOfQuestions;
    console.log(this.maximum);
  }

  public submitTest(){
    console.log(this.allRandomQuestions);
    this.test.questions=this.allRandomQuestions;
    this.test.testName=this.testName;
    this.test.author=this.userService.getCurrentUser();
    this.test.timer=this.timer;
    this.testService.addTest(this.test).subscribe(data => console.log(data), error => console.log(error));
    
    this.timer=null;
    this.testName=null;
    this.numberOfQuestions=null;
    this.allRandomQuestions=[];
  }
  //criar função que 
  public submitCategory(){
    console.log(this.categoryString);
    this.categoryClass.category=this.categoryString;
    this.categoryService.addCategory(this.categoryClass).subscribe(data=> console.log(data), error=>console.log(error));
    this.categoryString=null;
  }

  public addOption(){
    this.numberOfTimes.push(1);
    console.log(this.options);
    this.options.push(null);
    this.checkValidityQuestion();
    //this.addElement+='<strong>The Tortoise</strong> &amp; the Hare';
  }

  public getIDByCategory(category){
    for(let i=0; i<this.categories.length; i++)
      if(this.categories[i].category.category==category) return this.categories[i].category.id;
    return -1;
  }
  
  public getCategoryByName(category){
    for(let i=0; i<this.categories.length; i++)
      if(this.categories[i].category.category==category) return this.categories[i].category;
    return -1;
  }

  public addQuestion(){
    this.categoryClass=this.getCategoryByName(this.category);
    this.questionClass.category=this.categoryClass;
    this.questionClass.options=this.options;
    this.questionClass.question=this.questionString;
    this.questionClass.solution=this.solution;
    this.questionService.addQuestion(this.questionClass).subscribe(
      data=> {console.log(data);
      }, 
      error=>console.log(error));

    this.questionClass=new Question();
    this.options=[];
    this.questionString="";
    this.solution=[];
    this.numberOfTimes=[];
    this.questionFormValidity=false;
    this.firstCheck=false;
  }

  onChange(i:number, isChecked: boolean) {
  
    if(isChecked) {
      this.solution.push(i);
    } else {
      this.solution.splice(this.solution.indexOf(i),1);
    }
  }

  reset($event: NgbTabChangeEvent){
    this.categoryService.getAllCategories();
    this.category="";
    //console.log(this.categories);
    //console.log(this.subscriptionCategories);
    this.categories$.subscribe(data => this.categories=data);
  }

  onSubmit(){
    console.log("hi!");
  }
}
