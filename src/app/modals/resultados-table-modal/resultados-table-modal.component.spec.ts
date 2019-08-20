import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosTableModalComponent } from './resultados-table-modal.component';

describe('ResultadosTableModalComponent', () => {
  let component: ResultadosTableModalComponent;
  let fixture: ComponentFixture<ResultadosTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
