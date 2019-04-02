import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QLDonViTTKTTinhComponent } from './ql-donvi-ttkt.component';

describe('QLDonViTTKTTinhComponent', () => {
  let component: QLDonViTTKTTinhComponent;
  let fixture: ComponentFixture<QLDonViTTKTTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QLDonViTTKTTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QLDonViTTKTTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
