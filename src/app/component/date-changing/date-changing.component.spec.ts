import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateChangingComponent } from './date-changing.component';

describe('DateChangingComponent', () => {
  let component: DateChangingComponent;
  let fixture: ComponentFixture<DateChangingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateChangingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateChangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
