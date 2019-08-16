import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxResultsTableComponent } from './ngx-results-table.component';

describe('NgxResultsTableComponent', () => {
  let component: NgxResultsTableComponent;
  let fixture: ComponentFixture<NgxResultsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxResultsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
