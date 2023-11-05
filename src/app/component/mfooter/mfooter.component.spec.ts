import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfooterComponent } from './mfooter.component';

describe('MfooterComponent', () => {
  let component: MfooterComponent;
  let fixture: ComponentFixture<MfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
