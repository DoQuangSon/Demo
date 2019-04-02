import { TestBed, inject } from '@angular/core/testing';

import { CauHinhNgayNghiService } from './cau-hinh-ngay-nghi.service';

describe('CauHinhNgayNghiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CauHinhNgayNghiService]
    });
  });

  it('should be created', inject([CauHinhNgayNghiService], (service: CauHinhNgayNghiService) => {
    expect(service).toBeTruthy();
  }));
});
