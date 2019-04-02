import { TestBed, inject } from '@angular/core/testing';

import { DmPhongBanService } from './dm-phong-ban.service';

describe('DmPhongBanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DmPhongBanService]
    });
  });

  it('should be created', inject([DmPhongBanService], (service: DmPhongBanService) => {
    expect(service).toBeTruthy();
  }));
});
