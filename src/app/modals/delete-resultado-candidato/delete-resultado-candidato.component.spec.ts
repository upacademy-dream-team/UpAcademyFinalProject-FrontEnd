import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResultadoCandidatoComponent } from './delete-resultado-candidato.component';

describe('DeleteResultadoCandidatoComponent', () => {
  let component: DeleteResultadoCandidatoComponent;
  let fixture: ComponentFixture<DeleteResultadoCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteResultadoCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteResultadoCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
