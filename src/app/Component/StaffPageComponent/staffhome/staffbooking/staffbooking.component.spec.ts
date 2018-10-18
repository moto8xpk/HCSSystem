import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffbookingComponent } from './staffbooking.component';

describe('StaffbookingComponent', () => {
  let component: StaffbookingComponent;
  let fixture: ComponentFixture<StaffbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
