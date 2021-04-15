import { TestBed } from '@angular/core/testing';

import { TodoscoleccionesService } from './todoscolecciones.service';

describe('TodoscoleccionesService', () => {
  let service: TodoscoleccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoscoleccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
