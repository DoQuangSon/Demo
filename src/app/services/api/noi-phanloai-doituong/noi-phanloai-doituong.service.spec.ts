import { TestBed, inject } from '@angular/core/testing';

import { NoiPhanloaiDoituongService } from './noi-phanloai-doituong.service';

describe('NoiPhanloaiDoituongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiPhanloaiDoituongService]
    });
  });

  it('should be created', inject([NoiPhanloaiDoituongService], (service: NoiPhanloaiDoituongService) => {
    expect(service).toBeTruthy();
  }));
});
