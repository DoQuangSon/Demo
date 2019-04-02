import { TestBed, inject } from '@angular/core/testing';

import { KeHoachToanNganhService } from './ke-hoach-toan-nganh.service';

describe('KeHoachToanNganhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeHoachToanNganhService]
    });
  });

  it('should be created', inject([KeHoachToanNganhService], (service: KeHoachToanNganhService) => {
    expect(service).toBeTruthy();
  }));
});
