import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoTtktTwComponent } from './bao-cao-ttkt-tw.component';

describe('BaoCaoTtktTwComponent', () => {
  let component: BaoCaoTtktTwComponent;
  let fixture: ComponentFixture<BaoCaoTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
