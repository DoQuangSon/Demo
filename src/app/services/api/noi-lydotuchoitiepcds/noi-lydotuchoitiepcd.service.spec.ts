import { TestBed, inject } from '@angular/core/testing';

import { NoiLydotuchoitiepcdService } from './noi-lydotuchoitiepcd.service';

describe('NoiLydotuchoitiepcdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiLydotuchoitiepcdService]
    });
  });

  it('should be created', inject([NoiLydotuchoitiepcdService], (service: NoiLydotuchoitiepcdService) => {
    expect(service).toBeTruthy();
  }));
});
