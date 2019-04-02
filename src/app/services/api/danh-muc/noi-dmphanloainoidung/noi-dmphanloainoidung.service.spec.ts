import { TestBed, inject } from '@angular/core/testing';

import { NoiDmphanloainoidungService } from './noi-dmphanloainoidung.service';

describe('NoiDmphanloainoidungService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDmphanloainoidungService]
    });
  });

  it('should be created', inject([NoiDmphanloainoidungService], (service: NoiDmphanloainoidungService) => {
    expect(service).toBeTruthy();
  }));
});
