import { TestBed, inject } from '@angular/core/testing';

import { NoiBcTonghopKqService } from './noi-bc-tonghop-kq.service';

describe('NoiBcTonghopKqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiBcTonghopKqService]
    });
  });

  it('should be created', inject([NoiBcTonghopKqService], (service: NoiBcTonghopKqService) => {
    expect(service).toBeTruthy();
  }));
});
