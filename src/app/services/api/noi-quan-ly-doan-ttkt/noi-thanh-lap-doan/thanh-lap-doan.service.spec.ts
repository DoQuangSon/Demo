import { TestBed, inject } from '@angular/core/testing';

import { ThanhLapDoanService } from './thanh-lap-doan.service';

describe('ThanhLapDoanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThanhLapDoanService]
    });
  });

  it('should be created', inject([ThanhLapDoanService], (service: ThanhLapDoanService) => {
    expect(service).toBeTruthy();
  }));
});
