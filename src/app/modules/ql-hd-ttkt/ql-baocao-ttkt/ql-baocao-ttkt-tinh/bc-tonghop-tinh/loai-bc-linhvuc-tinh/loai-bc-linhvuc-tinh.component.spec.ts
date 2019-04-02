import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiBcLinhvucTinhComponent } from './loai-bc-linhvuc-tinh.component';

describe('LoaiBcLinhvucTinhComponent', () => {
  let component: LoaiBcLinhvucTinhComponent;
  let fixture: ComponentFixture<LoaiBcLinhvucTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiBcLinhvucTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiBcLinhvucTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
