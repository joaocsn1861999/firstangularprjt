import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysValueCalculatorComponent } from './days-value-calculator.component';

describe('DaysValueCalculatorComponent', () => {
  let component: DaysValueCalculatorComponent;
  let fixture: ComponentFixture<DaysValueCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysValueCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysValueCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
