import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailQdTtktBhxhVnComponent } from './detail-qd-ttkt-bhxh-vn.component';

describe('DetailQdTtktBhxhVnComponent', () => {
  let component: DetailQdTtktBhxhVnComponent;
  let fixture: ComponentFixture<DetailQdTtktBhxhVnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailQdTtktBhxhVnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailQdTtktBhxhVnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
