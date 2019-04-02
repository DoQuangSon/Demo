import { TestBed, inject } from '@angular/core/testing';

import { NoiLichtiepcdService } from './noi-lichtiepcd.service';

describe('NoiLichtiepcdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiLichtiepcdService]
    });
  });

  it('should be created', inject([NoiLichtiepcdService], (service: NoiLichtiepcdService) => {
    expect(service).toBeTruthy();
  }));
});
