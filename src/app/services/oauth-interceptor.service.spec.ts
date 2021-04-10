import { TestBed } from '@angular/core/testing';

import { OauthInterceptorService } from './oauth-interceptor.service';

describe('OauthInterceptorService', () => {
  let service: OauthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
