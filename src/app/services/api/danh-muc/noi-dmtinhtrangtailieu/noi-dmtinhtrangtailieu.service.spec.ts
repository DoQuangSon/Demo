import { TestBed, inject } from '@angular/core/testing';

import { NoiDmtinhtrangtailieuService } from './noi-dmtinhtrangtailieu.service';

describe('NoiDmtinhtrangtailieuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmtinhtrangtailieuService]
    });
  });

  it('should be created', inject([NoiDmtinhtrangtailieuService], (service: NoiDmtinhtrangtailieuService) => {
    expect(service).toBeTruthy();
  }));
});
