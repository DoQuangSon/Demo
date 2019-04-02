import { TestBed, inject } from '@angular/core/testing';

import { CauHinhThoiHanService } from './cau-hinh-thoi-han.service';

describe('CauHinhThoiHanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CauHinhThoiHanService]
    });
  });

  it('should be created', inject([CauHinhThoiHanService], (service: CauHinhThoiHanService) => {
    expect(service).toBeTruthy();
  }));
});
