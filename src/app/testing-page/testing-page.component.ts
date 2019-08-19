import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('data') meals: string[] = [];

  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1
  };
  public labels: any = {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  private popped = [];

  onPageChange(number: number) {
      console.log('change to page', number);
      this.config.currentPage = number;
  }

  pushItem() {
      let item = this.popped.pop() || 'A newly-created meal!';
      this.meals.push(item);
  }

  popItem() {
      this.popped.push(this.meals.pop());
  }

  constructor() {
  }

  ngOnInit() {
  }

}
