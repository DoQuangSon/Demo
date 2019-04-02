import { TestBed, inject } from '@angular/core/testing';

import { NoiTiepcongdanService } from './noi-tiepcongdan.service';

describe('NoiTiepcongdanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiTiepcongdanService]
    });
  });

  it('should be created', inject([NoiTiepcongdanService], (service: NoiTiepcongdanService) => {
    expect(service).toBeTruthy();
  }));
});
