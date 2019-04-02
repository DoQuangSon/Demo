import { TestBed, inject } from '@angular/core/testing';

import { NoiAccountService } from './noi-account.service';

describe('NoiAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiAccountService]
    });
  });

  it('should be created', inject([NoiAccountService], (service: NoiAccountService) => {
    expect(service).toBeTruthy();
  }));
});
