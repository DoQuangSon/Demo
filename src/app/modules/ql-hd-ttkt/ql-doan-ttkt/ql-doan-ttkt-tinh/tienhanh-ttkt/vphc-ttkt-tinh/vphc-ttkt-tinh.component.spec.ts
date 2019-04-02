import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VphcTtktTinhComponent } from './vphc-ttkt-tinh.component';

describe('VphcTtktTinhComponent', () => {
  let component: VphcTtktTinhComponent;
  let fixture: ComponentFixture<VphcTtktTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VphcTtktTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VphcTtktTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
