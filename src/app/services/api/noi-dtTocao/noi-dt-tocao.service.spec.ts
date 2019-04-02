import { TestBed, inject } from '@angular/core/testing';

import { NoiDtTocaoService } from './noi-dt-tocao.service';

describe('NoiDtTocaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDtTocaoService]
    });
  });

  it('should be created', inject([NoiDtTocaoService], (service: NoiDtTocaoService) => {
    expect(service).toBeTruthy();
  }));
});
