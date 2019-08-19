import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAndCategoriesComponent } from './questions-and-categories.component';

describe('QuestionsAndCategoriesComponent', () => {
  let component: QuestionsAndCategoriesComponent;
  let fixture: ComponentFixture<QuestionsAndCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsAndCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAndCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
