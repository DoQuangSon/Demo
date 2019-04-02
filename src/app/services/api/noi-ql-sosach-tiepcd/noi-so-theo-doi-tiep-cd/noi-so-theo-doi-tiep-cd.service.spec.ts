import { TestBed, inject } from '@angular/core/testing';

import { NoiSoTheoDoiTiepCdService } from './noi-so-theo-doi-tiep-cd.service';

describe('NoiSoTheoDoiTiepCdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiSoTheoDoiTiepCdService]
    });
  });

  it('should be created', inject([NoiSoTheoDoiTiepCdService], (service: NoiSoTheoDoiTiepCdService) => {
    expect(service).toBeTruthy();
  }));
});
