import { TestBed, inject } from '@angular/core/testing';

import { NoiDonthuService } from './noi-donthu.service';

describe('NoiDtkhieunaiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDonthuService]
    });
  });

  it('should be created', inject([NoiDonthuService], (service: NoiDonthuService) => {
    expect(service).toBeTruthy();
  }));
});
