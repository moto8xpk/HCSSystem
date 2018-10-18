import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StafftimeComponent } from './stafftime.component';

describe('StafftimeComponent', () => {
  let component: StafftimeComponent;
  let fixture: ComponentFixture<StafftimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StafftimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StafftimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
