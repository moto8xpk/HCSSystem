import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberbookingComponent } from './memberbooking.component';

describe('MemberbookingComponent', () => {
  let component: MemberbookingComponent;
  let fixture: ComponentFixture<MemberbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
