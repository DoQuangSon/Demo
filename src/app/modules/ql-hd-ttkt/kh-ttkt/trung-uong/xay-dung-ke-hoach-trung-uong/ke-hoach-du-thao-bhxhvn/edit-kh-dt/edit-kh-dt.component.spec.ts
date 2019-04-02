import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKhDtComponent } from './edit-kh-dt.component';

describe('EditKhDtComponent', () => {
  let component: EditKhDtComponent;
  let fixture: ComponentFixture<EditKhDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKhDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKhDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
