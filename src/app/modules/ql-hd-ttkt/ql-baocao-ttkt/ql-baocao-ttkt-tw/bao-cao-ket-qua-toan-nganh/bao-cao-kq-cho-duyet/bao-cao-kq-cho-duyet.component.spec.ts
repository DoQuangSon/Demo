import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoKqChoDuyetComponent } from './bao-cao-kq-cho-duyet.component';

describe('BaoCaoKqChoDuyetComponent', () => {
  let component: BaoCaoKqChoDuyetComponent;
  let fixture: ComponentFixture<BaoCaoKqChoDuyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoKqChoDuyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoKqChoDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
