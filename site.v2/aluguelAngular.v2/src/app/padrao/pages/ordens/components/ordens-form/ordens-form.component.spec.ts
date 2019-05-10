import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdensFormComponent} from './ordens-form.component';

describe('OrdensFormComponent', () => {
  let component: OrdensFormComponent;
  let fixture: ComponentFixture<OrdensFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdensFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
