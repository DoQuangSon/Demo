import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThanhLapDoanComponent } from './edit-thanh-lap-doan.component';

describe('EditThanhLapDoanComponent', () => {
  let component: EditThanhLapDoanComponent;
  let fixture: ComponentFixture<EditThanhLapDoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThanhLapDoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThanhLapDoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
