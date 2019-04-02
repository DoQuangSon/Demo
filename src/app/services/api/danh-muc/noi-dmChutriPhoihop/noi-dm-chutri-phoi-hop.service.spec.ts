import { TestBed, inject } from '@angular/core/testing';

import { NoiDmChutriPhoiHopService } from './noi-dm-chutri-phoi-hop.service';

describe('NoiDmChutriPhoiHopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmChutriPhoiHopService]
    });
  });

  it('should be created', inject([NoiDmChutriPhoiHopService], (service: NoiDmChutriPhoiHopService) => {
    expect(service).toBeTruthy();
  }));
});
