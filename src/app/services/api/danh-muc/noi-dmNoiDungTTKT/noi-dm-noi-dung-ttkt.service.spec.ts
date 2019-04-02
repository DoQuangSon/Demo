import { TestBed, inject } from '@angular/core/testing';

import { NoiDmNoiDungTtktService } from './noi-dm-noi-dung-ttkt.service';

describe('NoiDmNoiDungTtktService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmNoiDungTtktService]
    });
  });

  it('should be created', inject([NoiDmNoiDungTtktService], (service: NoiDmNoiDungTtktService) => {
    expect(service).toBeTruthy();
  }));
});
