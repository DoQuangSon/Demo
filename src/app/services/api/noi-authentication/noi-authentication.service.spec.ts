import { TestBed, inject } from '@angular/core/testing';

import { NoiAuthenticationService } from './noi-authentication.service';

describe('NoiAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiAuthenticationService]
    });
  });

  it('should be created', inject([NoiAuthenticationService], (service: NoiAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
