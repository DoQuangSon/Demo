import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QLDonViTTKTTWComponent } from './ql-donvi-ttkt-tw.component';

describe('QLDonViTTKTTWComponent', () => {
  let component: QLDonViTTKTTWComponent;
  let fixture: ComponentFixture<QLDonViTTKTTWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QLDonViTTKTTWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QLDonViTTKTTWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
