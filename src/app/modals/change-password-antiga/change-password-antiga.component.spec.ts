import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordAntigaComponent } from './change-password-antiga.component';

describe('ChangePasswordAntigaComponent', () => {
  let component: ChangePasswordAntigaComponent;
  let fixture: ComponentFixture<ChangePasswordAntigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordAntigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordAntigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
