import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQuestionsTableComponent } from './ngx-questions-table.component';

describe('NgxQuestionsTableComponent', () => {
  let component: NgxQuestionsTableComponent;
  let fixture: ComponentFixture<NgxQuestionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxQuestionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxQuestionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
