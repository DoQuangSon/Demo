import { TestBed, inject } from '@angular/core/testing';

import { TienHanhTtktService } from './tien-hanh-ttkt.service';

describe('TienHanhTtktService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TienHanhTtktService]
    });
  });

  it('should be created', inject([TienHanhTtktService], (service: TienHanhTtktService) => {
    expect(service).toBeTruthy();
  }));
});
