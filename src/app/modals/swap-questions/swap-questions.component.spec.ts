import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapQuestionsComponent } from './swap-questions.component';

describe('SwapQuestionsComponent', () => {
  let component: SwapQuestionsComponent;
  let fixture: ComponentFixture<SwapQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
