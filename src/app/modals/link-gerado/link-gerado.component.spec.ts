import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGeradoComponent } from './link-gerado.component';

describe('LinkGeradoComponent', () => {
  let component: LinkGeradoComponent;
  let fixture: ComponentFixture<LinkGeradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkGeradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkGeradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
