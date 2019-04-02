import { TestBed, inject } from '@angular/core/testing';

import { QLyNhomNguoiDungService } from './noi-qlnhomnguoidung.service';

describe('QLyNhomNguoiDungService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QLyNhomNguoiDungService]
    });
  });

  it('should be created', inject([QLyNhomNguoiDungService], (service: QLyNhomNguoiDungService) => {
    expect(service).toBeTruthy();
  }));
});
