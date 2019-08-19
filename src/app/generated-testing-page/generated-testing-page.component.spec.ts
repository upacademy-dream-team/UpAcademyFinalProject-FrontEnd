import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedTestingPageComponent } from './generated-testing-page.component';

describe('GeneratedTestingPageComponent', () => {
  let component: GeneratedTestingPageComponent;
  let fixture: ComponentFixture<GeneratedTestingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedTestingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedTestingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
