import { TestBed, inject } from '@angular/core/testing';

import { NoiKehoachDuthaoService } from './noi-kehoach-duthao.service';

describe('NoiKehoachDuthaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiKehoachDuthaoService]
    });
  });

  it('should be created', inject([NoiKehoachDuthaoService], (service: NoiKehoachDuthaoService) => {
    expect(service).toBeTruthy();
  }));
});
