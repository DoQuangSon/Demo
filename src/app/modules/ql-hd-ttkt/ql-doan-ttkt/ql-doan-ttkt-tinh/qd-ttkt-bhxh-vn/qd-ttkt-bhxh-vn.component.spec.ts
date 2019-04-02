import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QdTtktBhxhVnComponent } from './qd-ttkt-bhxh-vn.component';

describe('QdTtktBhxhVnComponent', () => {
  let component: QdTtktBhxhVnComponent;
  let fixture: ComponentFixture<QdTtktBhxhVnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QdTtktBhxhVnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QdTtktBhxhVnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
