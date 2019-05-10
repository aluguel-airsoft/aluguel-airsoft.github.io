import {TestBed} from '@angular/core/testing';

import {TitulosService} from './titulos.service';

describe('TitulosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitulosService = TestBed.get(TitulosService);
    expect(service).toBeTruthy();
  });
});
