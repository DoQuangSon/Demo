import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiBaoCaoTongHopTwComponent } from './taomoi-bao-cao-tong-hop-tw.component';

describe('TaomoiBaoCaoTongHopTwComponent', () => {
  let component: TaomoiBaoCaoTongHopTwComponent;
  let fixture: ComponentFixture<TaomoiBaoCaoTongHopTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiBaoCaoTongHopTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiBaoCaoTongHopTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
