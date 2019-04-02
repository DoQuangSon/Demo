import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDialogHistoryComponent } from './show-dialog-history.component';

describe('ShowDialogHistoryComponent', () => {
  let component: ShowDialogHistoryComponent;
  let fixture: ComponentFixture<ShowDialogHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDialogHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDialogHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
