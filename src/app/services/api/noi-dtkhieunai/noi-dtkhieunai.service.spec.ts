import { TestBed, inject } from '@angular/core/testing';

import { NoiDtkhieunaiService } from './noi-dtkhieunai.service';

describe('NoiDtkhieunaiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDtkhieunaiService]
    });
  });

  it('should be created', inject([NoiDtkhieunaiService], (service: NoiDtkhieunaiService) => {
    expect(service).toBeTruthy();
  }));
});
