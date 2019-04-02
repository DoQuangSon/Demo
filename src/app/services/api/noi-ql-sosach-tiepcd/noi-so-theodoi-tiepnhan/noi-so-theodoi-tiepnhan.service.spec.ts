import { TestBed, inject } from '@angular/core/testing';

import { NoiSoTheodoiTiepnhanService } from './noi-so-theodoi-tiepnhan.service';

describe('NoiSoTheodoiTiepnhanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiSoTheodoiTiepnhanService]
    });
  });

  it('should be created', inject([NoiSoTheodoiTiepnhanService], (service: NoiSoTheodoiTiepnhanService) => {
    expect(service).toBeTruthy();
  }));
});
