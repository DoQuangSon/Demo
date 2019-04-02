import { TestBed, inject } from '@angular/core/testing';

import { NoiDmbhxhService } from './noi-dmbhxh.service';

describe('NoiDmbhxhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmbhxhService]
    });
  });

  it('should be created', inject([NoiDmbhxhService], (service: NoiDmbhxhService) => {
    expect(service).toBeTruthy();
  }));
});
