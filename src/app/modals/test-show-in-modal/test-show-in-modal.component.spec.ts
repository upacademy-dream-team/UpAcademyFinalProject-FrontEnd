import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestShowInModalComponent } from './test-show-in-modal.component';

describe('TestShowInModalComponent', () => {
  let component: TestShowInModalComponent;
  let fixture: ComponentFixture<TestShowInModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestShowInModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShowInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
