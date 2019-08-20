import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnunciadosTableModalComponent } from './enunciados-table-modal.component';

describe('EnunciadosTableModalComponent', () => {
  let component: EnunciadosTableModalComponent;
  let fixture: ComponentFixture<EnunciadosTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnunciadosTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnunciadosTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
