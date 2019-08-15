import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteLocalComponent } from './teste-local.component';

describe('TesteLocalComponent', () => {
  let component: TesteLocalComponent;
  let fixture: ComponentFixture<TesteLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
