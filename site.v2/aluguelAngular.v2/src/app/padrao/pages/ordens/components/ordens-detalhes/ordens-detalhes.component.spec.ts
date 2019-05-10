import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdensDetalhesComponent} from './ordens-detalhes.component';

describe('OrdensDetalhesComponent', () => {
  let component: OrdensDetalhesComponent;
  let fixture: ComponentFixture<OrdensDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdensDetalhesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdensDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
