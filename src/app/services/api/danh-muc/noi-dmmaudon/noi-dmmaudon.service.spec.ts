import { TestBed, inject } from '@angular/core/testing';

import { NoiDmmaudonService } from './noi-dmmaudon.service';

describe('NoiDmmaudonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmmaudonService]
    });
  });

  it('should be created', inject([NoiDmmaudonService], (service: NoiDmmaudonService) => {
    expect(service).toBeTruthy();
  }));
});
