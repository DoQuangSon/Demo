import { TestBed, inject } from '@angular/core/testing';

import { DmCanCuService } from './dm-can-cu.service';

describe('DmCanCuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DmCanCuService]
    });
  });

  it('should be created', inject([DmCanCuService], (service: DmCanCuService) => {
    expect(service).toBeTruthy();
  }));
});
