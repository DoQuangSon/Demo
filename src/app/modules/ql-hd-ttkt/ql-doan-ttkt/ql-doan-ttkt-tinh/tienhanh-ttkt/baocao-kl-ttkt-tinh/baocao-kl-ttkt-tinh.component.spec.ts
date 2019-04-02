import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaoKlTtktTinhComponent } from './baocao-kl-ttkt-tinh.component';

describe('BaocaoKlTtktTinhComponent', () => {
  let component: BaocaoKlTtktTinhComponent;
  let fixture: ComponentFixture<BaocaoKlTtktTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaoKlTtktTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaoKlTtktTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
