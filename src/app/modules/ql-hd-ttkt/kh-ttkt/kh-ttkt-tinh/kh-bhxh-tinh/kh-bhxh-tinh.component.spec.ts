import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KHBHXHTinhComponent } from './kh-bhxh-tinh.component';

describe('KhBhxhTinhComponent', () => {
  let component: KHBHXHTinhComponent;
  let fixture: ComponentFixture<KHBHXHTinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KHBHXHTinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KHBHXHTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
