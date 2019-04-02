import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBckqNganhComponent } from './detail-bckq-nganh.component';

describe('DetailBckqNganhComponent', () => {
  let component: DetailBckqNganhComponent;
  let fixture: ComponentFixture<DetailBckqNganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBckqNganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBckqNganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
