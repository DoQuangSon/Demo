import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhBhxhTinhTableComponent } from './kh-bhxh-tinh-table.component';

describe('KhBhxhTinhTableComponent', () => {
  let component: KhBhxhTinhTableComponent;
  let fixture: ComponentFixture<KhBhxhTinhTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhBhxhTinhTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhBhxhTinhTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
