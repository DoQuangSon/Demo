import { TestBed, inject } from '@angular/core/testing';

import { ChiPhiKhamChuaBenhService } from './chi-phi-kham-chua-benh.service';

describe('ChiPhiKhamChuaBenhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChiPhiKhamChuaBenhService]
    });
  });

  it('should be created', inject([ChiPhiKhamChuaBenhService], (service: ChiPhiKhamChuaBenhService) => {
    expect(service).toBeTruthy();
  }));
});
