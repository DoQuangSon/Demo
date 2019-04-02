import { TestBed, inject } from '@angular/core/testing';

import { DmVbCancuXuphatService } from './dm-vb-cancu-xuphat.service';

describe('DmVbCancuXuphatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DmVbCancuXuphatService]
    });
  });

  it('should be created', inject([DmVbCancuXuphatService], (service: DmVbCancuXuphatService) => {
    expect(service).toBeTruthy();
  }));
});
