import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeePlanComponent } from './coffee-plan.component';

describe('CoffeePlanComponent', () => {
  let component: CoffeePlanComponent;
  let fixture: ComponentFixture<CoffeePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeePlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
