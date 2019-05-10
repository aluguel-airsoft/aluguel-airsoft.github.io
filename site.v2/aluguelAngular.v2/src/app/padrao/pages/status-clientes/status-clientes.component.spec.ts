import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusClientesComponent} from './status-clientes.component';

describe('StatusClientesComponent', () => {
  let component: StatusClientesComponent;
  let fixture: ComponentFixture<StatusClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusClientesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
