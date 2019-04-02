import { TestBed, inject } from '@angular/core/testing';

import { NoiDmPhanLoaiTieuThucService } from './noi-dm-phan-loai-tieu-thuc.service';

describe('NoiDmPhanLoaiTieuThucService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmPhanLoaiTieuThucService]
    });
  });

  it('should be created', inject([NoiDmPhanLoaiTieuThucService], (service: NoiDmPhanLoaiTieuThucService) => {
    expect(service).toBeTruthy();
  }));
});
