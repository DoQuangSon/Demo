import { TestBed, inject } from '@angular/core/testing';

import { NoiLydokhongthulytcService } from './noi-lydokhongthulytc.service';

describe('NoiLydokhongthulytcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiLydokhongthulytcService]
    });
  });

  it('should be created', inject([NoiLydokhongthulytcService], (service: NoiLydokhongthulytcService) => {
    expect(service).toBeTruthy();
  }));
});
