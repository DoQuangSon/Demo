import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomoiBcLinhvucTinhComponent } from './taomoi-bc-linhvuc-tinh.component';

describe('TaomoiBcLinhvucTinhComponent', () => {
  let component: TaomoiBcLinhvucTinhComponent;
  let fixture: ComponentFixture<TaomoiBcLinhvucTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaomoiBcLinhvucTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaomoiBcLinhvucTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
