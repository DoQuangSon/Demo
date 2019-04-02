import { TestBed, inject } from '@angular/core/testing';

import { NoiKiennghiPaService } from './noi-kiennghi-pa.service';

describe('NoiKiennghiPaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiKiennghiPaService]
    });
  });

  it('should be created', inject([NoiKiennghiPaService], (service: NoiKiennghiPaService) => {
    expect(service).toBeTruthy();
  }));
});
