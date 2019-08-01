import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEnunciadosComponent } from './consultar-enunciados.component';

describe('ConsultarEnunciadosComponent', () => {
  let component: ConsultarEnunciadosComponent;
  let fixture: ComponentFixture<ConsultarEnunciadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarEnunciadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarEnunciadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
