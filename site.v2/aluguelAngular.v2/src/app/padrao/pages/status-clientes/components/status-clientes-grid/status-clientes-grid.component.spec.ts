import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusClientesGridComponent} from './status-clientes-grid.component';

describe('StatusClientesGridComponent', () => {
  let component: StatusClientesGridComponent;
  let fixture: ComponentFixture<StatusClientesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusClientesGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusClientesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
