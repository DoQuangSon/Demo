import { TestBed, inject } from '@angular/core/testing';

import { NoiSoTheodoiChitietService } from './noi-so-theodoi-chitiet.service';

describe('NoiSoTheodoiChitietService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiSoTheodoiChitietService]
    });
  });

  it('should be created', inject([NoiSoTheodoiChitietService], (service: NoiSoTheodoiChitietService) => {
    expect(service).toBeTruthy();
  }));
});
