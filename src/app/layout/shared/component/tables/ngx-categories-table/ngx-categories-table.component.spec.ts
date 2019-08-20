import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCategoriesTableComponent } from './ngx-categories-table.component';

describe('NgxCategoriesTableComponent', () => {
  let component: NgxCategoriesTableComponent;
  let fixture: ComponentFixture<NgxCategoriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCategoriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
