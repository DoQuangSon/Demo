import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanloaiDoituongTtktComponent } from './phanloai-doituong-ttkt.component';

describe('PhanloaiDoituongTtktComponent', () => {
  let component: PhanloaiDoituongTtktComponent;
  let fixture: ComponentFixture<PhanloaiDoituongTtktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanloaiDoituongTtktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanloaiDoituongTtktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
