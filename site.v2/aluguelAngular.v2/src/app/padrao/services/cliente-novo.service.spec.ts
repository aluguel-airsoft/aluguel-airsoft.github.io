import {TestBed} from '@angular/core/testing';

import {ClienteNovoService} from './cliente-novo.service';

describe('ClienteNovoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteNovoService = TestBed.get(ClienteNovoService);
    expect(service).toBeTruthy();
  });
});
