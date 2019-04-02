import { TestBed, inject } from '@angular/core/testing';

import { PhanQuyenUserService } from './noi-phanquyennguoidung.service';

describe('PhanQuyenUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhanQuyenUserService]
    });
  });

  it('should be created', inject([PhanQuyenUserService], (service: PhanQuyenUserService) => {
    expect(service).toBeTruthy();
  }));
});
