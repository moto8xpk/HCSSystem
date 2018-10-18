import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffconfirmComponent } from './staffconfirm.component';

describe('StaffconfirmComponent', () => {
  let component: StaffconfirmComponent;
  let fixture: ComponentFixture<StaffconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
