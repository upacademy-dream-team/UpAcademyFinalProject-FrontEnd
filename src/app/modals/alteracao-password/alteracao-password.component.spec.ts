import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoPasswordComponent } from './alteracao-password.component';

describe('AlteracaoPasswordComponent', () => {
  let component: AlteracaoPasswordComponent;
  let fixture: ComponentFixture<AlteracaoPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteracaoPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteracaoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
