import { TestBed, inject } from '@angular/core/testing';

import { CauHinhThamSoHtService } from './cau-hinh-tham-so-ht.service';

describe('CauHinhThamSoHtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CauHinhThamSoHtService]
    });
  });

  it('should be created', inject([CauHinhThamSoHtService], (service: CauHinhThamSoHtService) => {
    expect(service).toBeTruthy();
  }));
});
