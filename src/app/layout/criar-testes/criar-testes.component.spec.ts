import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTestesComponent } from './criar-testes.component';

describe('CriarTestesComponent', () => {
  let component: CriarTestesComponent;
  let fixture: ComponentFixture<CriarTestesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTestesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTestesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
