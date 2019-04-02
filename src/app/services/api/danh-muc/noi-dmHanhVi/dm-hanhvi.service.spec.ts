import { TestBed, inject } from '@angular/core/testing';

import { DmHanhviService } from './dm-hanhvi.service';

describe('DmHanhviService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DmHanhviService]
    });
  });

  it('should be created', inject([DmHanhviService], (service: DmHanhviService) => {
    expect(service).toBeTruthy();
  }));
});
