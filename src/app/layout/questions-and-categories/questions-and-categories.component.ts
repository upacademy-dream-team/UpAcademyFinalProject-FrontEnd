import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'src/app/core/models/question';
import { ReplaySubject, Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { QuestionServiceService } from 'src/app/core/services/question-service/question-service.service';
import { CategoryServiceService } from 'src/app/core/services/category-service/category-service.service';

@Component({
  selector: 'app-questions-and-categories',
  templateUrl: './questions-and-categories.component.html',
  styleUrls: ['./questions-and-categories.component.scss']
})
export class QuestionsAndCategoriesComponent implements OnInit, OnDestroy {
  public questions$: ReplaySubject<Question[]>;
  public categories$: ReplaySubject<any>;
  private subscriptionQuestions: Subscription;
  private subscriptionCategory: Subscription;

  constructor(
    private questionsService: QuestionServiceService,
    private categoriesService: CategoryServiceService
  ) { 
    this.questions$ = this.questionsService.questions$;
    this.subscriptionQuestions = this.questions$.subscribe((a) => console.log('questions$', JSON.stringify(a)));
    this.categories$ = this.categoriesService.categories$;
    this.subscriptionCategory = this.categories$.subscribe((a) => console.log('categories$', JSON.stringify(a))) 
  }

  ngOnInit() {
    this.questionsService.getAllQuestions();
    this.categoriesService.getAllCategories();
  }

  ngOnDestroy() {
    this.subscriptionQuestions.unsubscribe();
    this.subscriptionCategory.unsubscribe();
  }

}
