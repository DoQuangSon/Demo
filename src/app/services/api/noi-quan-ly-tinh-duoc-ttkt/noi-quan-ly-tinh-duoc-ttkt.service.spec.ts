import { TestBed, inject } from '@angular/core/testing';

import { NoiQuanLyTinhDuocTtktService } from './noi-quan-ly-tinh-duoc-ttkt.service';

describe('NoiQuanLyTinhDuocTtktService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiQuanLyTinhDuocTtktService]
    });
  });

  it('should be created', inject([NoiQuanLyTinhDuocTtktService], (service: NoiQuanLyTinhDuocTtktService) => {
    expect(service).toBeTruthy();
  }));
});
