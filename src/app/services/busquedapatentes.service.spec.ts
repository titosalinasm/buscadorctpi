import { TestBed } from '@angular/core/testing';

import { BusquedapatentesService } from './busquedapatentes.service';

describe('BusquedapatentesService', () => {
  let service: BusquedapatentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedapatentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
