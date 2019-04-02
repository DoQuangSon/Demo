import { TestBed, inject } from '@angular/core/testing';

import { SoTheodoiKetluanService } from './so-theodoi-ketluan.service';

describe('SoTheodoiKetluanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoTheodoiKetluanService]
    });
  });

  it('should be created', inject([SoTheodoiKetluanService], (service: SoTheodoiKetluanService) => {
    expect(service).toBeTruthy();
  }));
});
