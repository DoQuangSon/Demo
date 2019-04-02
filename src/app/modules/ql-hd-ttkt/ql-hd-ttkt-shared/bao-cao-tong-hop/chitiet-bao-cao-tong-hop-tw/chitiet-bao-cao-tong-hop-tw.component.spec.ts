import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietBaoCaoTongHopTwComponent } from './chitiet-bao-cao-tong-hop-tw.component';

describe('ChitietBaoCaoTongHopTwComponent', () => {
  let component: ChitietBaoCaoTongHopTwComponent;
  let fixture: ComponentFixture<ChitietBaoCaoTongHopTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietBaoCaoTongHopTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietBaoCaoTongHopTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
