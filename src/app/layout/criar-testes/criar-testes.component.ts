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
  private category: string;
  private timer: number;
  private testName: string;
  private questions: Question[];
  test= new Test();
  

  ///adding category
  categoryString : string;
  categoryClass = new Category();

  ///adding question
  questionString: string;
  questionClass= new Question();


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
    return this.categories$.subscribe(/*data=> console.log(data)*/);
  }

  public submitTest(){
    console.log(this.allRandomQuestions);
    this.test.questions=this.allRandomQuestions;
    this.test.testName=this.testName;
    this.test.author=this.userService.getCurrentUser();
    this.test.timer=this.timer;
    this.testService.addTest(this.test).subscribe(data => console.log(data), error => console.log(error));
  }
  //criar função que 
  public submitCategory(){
    this.categoryClass.category=this.categoryString;
    this.categoryService.addCategory(this.categoryClass).subscribe(data=> console.log(data), error=>console.log(error));
  }

  public addOption(){
    this.numberOfTimes.push(1);
    console.log(this.options);
    //this.addElement+='<strong>The Tortoise</strong> &amp; the Hare';
  }

  public getIDByCategory(category){
    for(let i=0; i<this.categories.length; i++)
      if(this.categories[i].category==category) return this.categories[i].id;
    return -1;
  }
  
  public getCategoryByName(category){
    for(let i=0; i<this.categories.length; i++)
      if(this.categories[i].category==category) return this.categories[i];
    return -1;
  }

  public addQuestion(){
    this.categoryClass=this.getCategoryByName(this.category);
    this.questionClass.category=this.categoryClass;
    this.questionClass.options=this.options;
    this.questionClass.question=this.questionString;
    this.questionClass.solution=this.solution;
    this.questionService.addQuestion(this.questionClass).subscribe(data=> console.log(data), error=>console.log(error));
    //console.log(this.options);
    //console.log(this.solution);
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
    //console.log(this.categories);
    //console.log(this.subscriptionCategories);
    this.categories$.subscribe(data => this.categories=data);
  }
}
