import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdensGridComponent} from './ordens-grid.component';

describe('OrdensGridComponent', () => {
  let component: OrdensGridComponent;
  let fixture: ComponentFixture<OrdensGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdensGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdensGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
