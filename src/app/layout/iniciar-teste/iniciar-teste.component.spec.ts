import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarTesteComponent } from './iniciar-teste.component';

describe('IniciarTesteComponent', () => {
  let component: IniciarTesteComponent;
  let fixture: ComponentFixture<IniciarTesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarTesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
