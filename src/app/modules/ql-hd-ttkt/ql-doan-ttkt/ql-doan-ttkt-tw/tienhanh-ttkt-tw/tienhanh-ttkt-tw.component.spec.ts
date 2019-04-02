import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TienhanhTtktTwComponent } from './tienhanh-ttkt-tw.component';

describe('TienhanhTtktTwComponent', () => {
  let component: TienhanhTtktTwComponent;
  let fixture: ComponentFixture<TienhanhTtktTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TienhanhTtktTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TienhanhTtktTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
