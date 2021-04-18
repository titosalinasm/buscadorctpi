import { TestBed } from '@angular/core/testing';

import { BusquedaconocimientoService } from './busquedaconocimiento.service';

describe('BusquedaconocimientoService', () => {
  let service: BusquedaconocimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaconocimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
