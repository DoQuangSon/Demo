import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiBcLinhvucTwComponent } from './loai-bc-linhvuc-tw.component';

describe('LoaiBcLinhvucTwComponent', () => {
  let component: LoaiBcLinhvucTwComponent;
  let fixture: ComponentFixture<LoaiBcLinhvucTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiBcLinhvucTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiBcLinhvucTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
