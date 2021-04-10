import { TestBed } from '@angular/core/testing';

import { LstgeneralService } from './lstgeneral.service';

describe('LstgeneralService', () => {
  let service: LstgeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LstgeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
