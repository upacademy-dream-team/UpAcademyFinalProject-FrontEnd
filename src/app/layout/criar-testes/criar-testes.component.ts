import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbTabsetConfig, NgbTabChangeEvent, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Test } from 'src/app/core/models/test';
import { Category } from 'src/app/core/models/category';
import { ReplaySubject, Subscription } from 'rxjs';
import { CategoryServiceService } from 'src/app/core/services/category-service/category-service.service';
import { Question } from 'src/app/core/models/question';
import { QuestionServiceService } from 'src/app/core/services/question-service/question-service.service';
import { UserServiceService } from 'src/app/core';
import { TestServiceService } from 'src/app/core/services/test-service/test-service.service';
import { SwapQuestionsComponent } from 'src/app/modals/swap-questions/swap-questions.component';

@Component({
  selector: 'app-criar-testes',
  templateUrl: './criar-testes.component.html',
  styleUrls: ['./criar-testes.component.scss'],
  providers: [NgbTabsetConfig]
})
export class CriarTestesComponent implements OnInit, OnDestroy {
  public categories$: ReplaySubject<Category[]>;
  public randomQuestions$: ReplaySubject<Question[]>;
  public allRandomQuestions = [];
  public allCategories = [];
  private subscriptionCategories: Subscription;
  public categories;
  public numberOfTimes: number[] = [];
  public options: any[] = [];
  public solution: any[] = [];
  maximum: any;
  p:number = 1;
  public categoriesAtTheMoment;

  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal , config: NgbTabsetConfig, private testService: TestServiceService, private userService: UserServiceService, private categoryService: CategoryServiceService, private questionService: QuestionServiceService) {
    config.justify = 'center';
    config.type = 'pills';
    this.categories$ = this.categoryService.categories$;
    this.randomQuestions$ = this.questionService.randomQuestions$;

    this.subscriptionCategories = this.categories$.subscribe((a) => console.log('categories$', JSON.stringify(a)));
  }

  ngOnInit() {
    this.categoryService.getAllCategories();
    this.categoryService.getAllCategoriesWOS().subscribe(data=>this.categoriesAtTheMoment=data);
    this.categories$.subscribe(data => {this.categories = data;});
  }

  ngOnDestroy() {
    this.subscriptionCategories.unsubscribe();
  }

  public numberOfQuestions: number;
  private category= '';
  private categoryID: number;
  private categoryToSend: any;
  private categoryWithNumber: any;
  private timer: number;
  private testName: string;
  private questions: Question[];
  private questionFormValidity: boolean= false;
  private questionError: string="";
  private testError: string="";
  private categoryError: string="";
  private successMessage=false;
  private randomQuestionIDs=[];
  test= new Test();
  private firstCheck: boolean= false;
  private questionsByCategory=[];


  show(){
    console.log(this.categoryWithNumber.numberOfQuestions);
  }

  public checkIfQuestionAlreadyInUse(question){
    if(this.randomQuestionIDs.indexOf(question.id)==-1)
      return false;
    return true;
  }

  //this function is used so that one might use checkboxes as radio objects
  public uncheckOthers(checkArray, newCheckedIndex){
    let indexToUncheck;
    if(checkArray.indexOf(true)==newCheckedIndex)
      indexToUncheck=checkArray.lastIndexOf(true);
    else
      indexToUncheck=checkArray.indexOf(true);
    checkArray[indexToUncheck]=false;
  }

  public checkValidityQuestion() {
    console.log(this.options);
    console.log(this.solution);
    for (let i = 0; i < this.options.length; i++)
      if (this.options[i] == "" || this.options[i] == null) { this.questionFormValidity = false; return; }
    this.questionFormValidity = true;
    return;
  }

  public removeCategory(category) {
    for (let i = 0; i < this.categories.length; i++)
      if (this.categories[i].category.category == category)
        this.categories.splice(i, 1);
  }
  ///adding category
  categoryString: string;
  categoryClass = new Category();

  ///adding question
  questionString: string;
  questionClass = new Question();

  public showMessage() {
    console.log("tem de inserir solução")
  }

  public addInfo() {
    this.allCategories.push(this.category);
    this.categoryToSend=this.category;
    let categoryID=this.getIDByCategory(this.category, this.categoriesAtTheMoment);
    console.log("categoryID");
    console.log(categoryID);
    this.questionService.getRandomQuestions(categoryID, this.numberOfQuestions).subscribe(
      (res: any) => {
        for(let i=0; i<res.length;i++)
          this.randomQuestionIDs.push(res[i].id);
        this.allRandomQuestions.push(...res);
        this.randomQuestions$.next(this.allRandomQuestions);
      }
    );

    this.numberOfQuestions = 0;
    this.removeCategory(this.category);
    this.category = "";
    this.maximum = 0;
    // return this.categories$.subscribe(/*data=> console.log(data)*/);
  }

  public getNumberOfQuestionsByCategory() {
    console.log("entrou aqui");
    console.log(this.category);
    for (let i = 0; i < this.categories.length; i++)
      if (this.categories[i].category.category == this.category)
        this.maximum = this.categories[i].numberOfQuestions;
    console.log(this.maximum);
  }

  public submitTest() {
    this.categoryService.getAllCategories();
    console.log(this.allRandomQuestions);
    this.test.questions = this.allRandomQuestions;
    this.test.testName = this.testName;
    this.test.author = this.userService.getCurrentUser();
    this.test.timer = this.timer;
    this.testService.addTest(this.test).subscribe(
      data => {
        console.log(data);
        this.category="";
        this.timer=null;
        this.testName=null;
        this.numberOfQuestions=null;
        this.allRandomQuestions=[];
        this.testError=""
        this.showSuccessMessage(3000);},
      error => {
        console.log(error);
        this.testError = error.error;
      });

  }
  //criar função que
  public submitCategory() {
    console.log(this.categoryString);
    this.categoryClass.category = this.categoryString;
    this.categoryService.addCategory(this.categoryClass).subscribe(
      data => {
        console.log(data);
        this.categoryString=null;
        this.categoryError="";
        this.showSuccessMessage(3000);
      },
      error=>{
        console.log(error);
        this.categoryError = error.error;

      });
  }

  public showSuccessMessage(time){
    this.successMessage=true;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.successMessage = false;
    }, time);
  }

  public addOption(){
    this.numberOfTimes.push(1);
    console.log(this.options);
    this.options.push(null);
    this.checkValidityQuestion();
  }

  public getIDByCategory(category, myCategories) {
    for (let i = 0; i < myCategories.length; i++)
      if (myCategories[i].category.category == category) return myCategories[i].category.id;
    return -1;
  }

  public getCategoryByName(category) {
    for (let i = 0; i < this.categories.length; i++)
      if (this.categories[i].category.category == category) return this.categories[i].category;
    return -1;
  }

  public addQuestion() {
    this.categoryClass = this.getCategoryByName(this.category);
    this.questionClass.category = this.categoryClass;
    this.questionClass.options = this.options;
    this.questionClass.question = this.questionString;
    this.questionClass.solution = this.solution;
    this.questionService.addQuestion(this.questionClass).subscribe(
      data => {
        console.log('entrou em data');
        console.log(data);
        this.category = '';
        this.questionClass = new Question();
        this.options = [];
        this.questionString = '';
        this.solution = [];
        this.numberOfTimes = [];
        this.questionFormValidity = false;
        this.firstCheck = false;
        this.questionError = '';
        this.categoryClass = new Category();
        this.showSuccessMessage(3000);
      },
      error=>{console.log(error.error); this.questionError = error.error;});
  }

  onChange(i:number, isChecked: boolean) {

    if ( isChecked ) {
      this.solution.push(i);
    } else {
      this.solution.splice(this.solution.indexOf(i), 1);
    }
  }

  reset($event: NgbTabChangeEvent) {
    this.categoryService.getAllCategories();
    this.category = "";
    this.categories$.subscribe(data => this.categories = data);
    this.categoryService.getAllCategoriesWOS().subscribe(data=>this.categoriesAtTheMoment=data);
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  errorAlertCategoriesReset() {
    this.categoryError = '';
  }

  errorAlertQuestionsReset() {
    this.questionError = '';
  }

  errorAlertTestReset() {
    this.testError = '';
  }

  onSubmit() {
  }

  changeQuestion(nowIndex) {
    console.log(nowIndex);
    const modalRef = this.modalService.open(SwapQuestionsComponent,
      { size: 'lg', backdrop: 'static',});

    modalRef.componentInstance.categoryID=this.getIDByCategory(this.categoryToSend, this.categoriesAtTheMoment);
    modalRef.componentInstance.allRandomQuestions=this.allRandomQuestions;

    ////recebido a pergunta ou -1
    modalRef.componentInstance.passEntry.subscribe(data =>{
      let question = data;
      console.log(question);
      if ( question !== -1 ) {
        this.allRandomQuestions[nowIndex] = question;
      }
      this.modalService.dismissAll();
    }
    );

  }

}

