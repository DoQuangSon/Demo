import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoTtktTinhComponent } from './bao-cao-ttkt-tinh.component';

describe('BaoCaoTtktTinhComponent', () => {
  let component: BaoCaoTtktTinhComponent;
  let fixture: ComponentFixture<BaoCaoTtktTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoTtktTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoTtktTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
