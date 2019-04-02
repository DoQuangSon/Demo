import { TestBed, inject } from '@angular/core/testing';

import { PhanLoaiDtService } from './phan-loai-dt.service';

describe('PhanLoaiDtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhanLoaiDtService]
    });
  });

  it('should be created', inject([PhanLoaiDtService], (service: PhanLoaiDtService) => {
    expect(service).toBeTruthy();
  }));
});
