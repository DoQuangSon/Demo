import { TestBed, inject } from '@angular/core/testing';

import { NoiSoTonghopKqService } from './noi-so-tonghop-kq.service';

describe('NoiSoTonghopKqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiSoTonghopKqService]
    });
  });

  it('should be created', inject([NoiSoTonghopKqService], (service: NoiSoTonghopKqService) => {
    expect(service).toBeTruthy();
  }));
});
