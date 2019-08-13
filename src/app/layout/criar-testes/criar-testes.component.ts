import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
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
    );;
    return this.categories$.subscribe(/*data=> console.log(data)*/);
  }

  public submitTest(){
    this.test.questions=this.allRandomQuestions;
    this.test.testName=this.testName;
    this.test.author=this.userService.getCurrentUser();
    this.test.timer=this.timer;
    this.testService.addTest(this.test).subscribe(data => console.log(data), error => console.log(error));
  }
  //criar função que 

}
