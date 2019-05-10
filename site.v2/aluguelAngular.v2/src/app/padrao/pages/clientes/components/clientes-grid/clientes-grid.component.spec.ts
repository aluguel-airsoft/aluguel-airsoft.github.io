import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientesGridComponent} from './clientes-grid.component';

describe('StatusClientesGridComponent', () => {
  let component: ClientesGridComponent;
  let fixture: ComponentFixture<ClientesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
