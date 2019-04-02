import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDialogLichSuTinhTpComponent } from './show-dialog-lich-su-tinh-tp.component';

describe('ShowDialogLichSuTinhTpComponent', () => {
  let component: ShowDialogLichSuTinhTpComponent;
  let fixture: ComponentFixture<ShowDialogLichSuTinhTpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDialogLichSuTinhTpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDialogLichSuTinhTpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
