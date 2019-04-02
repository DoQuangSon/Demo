import { TestBed, inject } from '@angular/core/testing';

import { NoiDmChucDanhService } from './noi-dm-chucdanh.service';

describe('NoiDmChucDanhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmChucDanhService]
    });
  });

  it('should be created', inject([NoiDmChucDanhService], (service: NoiDmChucDanhService) => {
    expect(service).toBeTruthy();
  }));
});
