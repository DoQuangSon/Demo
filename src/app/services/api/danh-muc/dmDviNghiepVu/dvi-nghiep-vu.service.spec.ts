import { TestBed, inject } from '@angular/core/testing';

import { DonViNghiepVuService } from './dvi-nghiep-vu.service';

describe('DonViNghiepVuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonViNghiepVuService]
    });
  });

  it('should be created', inject([DonViNghiepVuService], (service: DonViNghiepVuService) => {
    expect(service).toBeTruthy();
  }));
});
