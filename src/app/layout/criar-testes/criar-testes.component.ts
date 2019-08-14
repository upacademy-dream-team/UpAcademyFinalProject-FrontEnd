import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { Test } from 'src/app/core/models/test';
import { Category } from 'src/app/core/models/category';
import { ReplaySubject, Subscription } from 'rxjs';
import { CategoryServiceService } from 'src/app/core/services/category-service/category-service.service';

@Component({
  selector: 'app-criar-testes',
  templateUrl: './criar-testes.component.html',
  styleUrls: ['./criar-testes.component.scss'],
  providers: [NgbTabsetConfig]
})
export class CriarTestesComponent implements OnInit, OnDestroy {

  public categories$: ReplaySubject<Category[]>;
  private subscriptionCategories: Subscription;
  public categories;

  constructor(config: NgbTabsetConfig, private categoryService: CategoryServiceService) {
    config.justify = 'center';
    config.type = 'pills';
    this.categories$ = this.categoryService.categories$;
    this.subscriptionCategories = this.categories$.subscribe((a) => console.log('categories$', JSON.stringify(a)));
   }

  ngOnInit() {
    this.categoryService.getAllCategories();
    //console.log(this.categories);
    //console.log(this.subscriptionCategories);
    this.categories$.subscribe(data => this.categories=data)
  }

  ngOnDestroy(){
    this.subscriptionCategories.unsubscribe();
  }

  private numberOfQuestions: number;
  private category: string;
  private timer: number;
  private testName: string;

  public addInfo(){
    console.log(this.categories);
    return this.categories$.subscribe(/*data=> console.log(data)*/);
  }
  //criar função que 

}
