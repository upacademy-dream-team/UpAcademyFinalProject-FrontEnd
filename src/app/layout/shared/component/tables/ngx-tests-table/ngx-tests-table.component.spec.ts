import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTestsTableComponent } from './ngx-tests-table.component';

describe('NgxTestsTableComponent', () => {
  let component: NgxTestsTableComponent;
  let fixture: ComponentFixture<NgxTestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
