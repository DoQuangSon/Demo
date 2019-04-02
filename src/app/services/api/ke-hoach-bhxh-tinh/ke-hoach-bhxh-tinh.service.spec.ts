import { TestBed, inject } from '@angular/core/testing';

import { KeHoachBhxhTinhService } from './ke-hoach-bhxh-tinh.service';

describe('KeHoachBhxhTinhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeHoachBhxhTinhService]
    });
  });

  it('should be created', inject([KeHoachBhxhTinhService], (service: KeHoachBhxhTinhService) => {
    expect(service).toBeTruthy();
  }));
});
