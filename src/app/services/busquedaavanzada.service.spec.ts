import { TestBed } from '@angular/core/testing';

import { BusquedaavanzadaService } from './busquedaavanzada.service';

describe('BusquedaavanzadaService', () => {
  let service: BusquedaavanzadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaavanzadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
