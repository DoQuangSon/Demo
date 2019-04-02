import { TestBed, inject } from '@angular/core/testing';

import { NoiDmTinhHuyenService } from './noi-dm-tinh-huyen.service';

describe('NoiDmTinhHuyenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmTinhHuyenService]
    });
  });

  it('should be created', inject([NoiDmTinhHuyenService], (service: NoiDmTinhHuyenService) => {
    expect(service).toBeTruthy();
  }));
});
