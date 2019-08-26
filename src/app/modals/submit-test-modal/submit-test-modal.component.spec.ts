import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTestModalComponent } from './submit-test-modal.component';

describe('SubmitTestModalComponent', () => {
  let component: SubmitTestModalComponent;
  let fixture: ComponentFixture<SubmitTestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitTestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
