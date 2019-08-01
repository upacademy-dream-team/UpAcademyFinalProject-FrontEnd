import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarResultadosComponent } from './consultar-resultados.component';

describe('ConsultarResultadosComponent', () => {
  let component: ConsultarResultadosComponent;
  let fixture: ComponentFixture<ConsultarResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
