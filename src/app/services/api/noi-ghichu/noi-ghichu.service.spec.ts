import { TestBed, inject } from '@angular/core/testing';

import { NoiGhichuService } from './noi-ghichu.service';

describe('NoiGhichuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiGhichuService]
    });
  });

  it('should be created', inject([NoiGhichuService], (service: NoiGhichuService) => {
    expect(service).toBeTruthy();
  }));
});
