import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanejamentoGridComponent} from './planejamento-grid.component';

describe('PlanejamentoGridComponent', () => {
  let component: PlanejamentoGridComponent;
  let fixture: ComponentFixture<PlanejamentoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanejamentoGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
