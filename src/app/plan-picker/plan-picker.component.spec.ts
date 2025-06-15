import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanPickerComponent } from './plan-picker.component';
import { CoffeePlanComponent } from '../coffee-plan/coffee-plan.component';
import { AddCoffeePlanComponent } from '../add-coffee-plan/add-coffee-plan.component';
import { NO_ERRORS_SCHEMA, TemplateRef, signal } from '@angular/core'; // Import signal

// Mock COFFEE_PLAN_PREFIX if it's used in the component and not exported directly for testing
const COFFEE_PLAN_PREFIX = 'The';

describe('PlanPickerComponent', () => {
  let component: PlanPickerComponent;
  let fixture: ComponentFixture<PlanPickerComponent>;
  let mockCoffeeTemplateRef: TemplateRef<any>;
  let mockBeverageTemplateRef: TemplateRef<any>;

  beforeEach(async () => {
    // Initialize basic mocks for TemplateRef
    mockCoffeeTemplateRef = {
      elementRef: {} // A very basic mock, adjust if more properties are needed
    } as TemplateRef<any>;
    mockBeverageTemplateRef = {
      elementRef: {}
    } as TemplateRef<any>;

    await TestBed.configureTestingModule({
      declarations: [PlanPickerComponent, CoffeePlanComponent, AddCoffeePlanComponent],
      schemas: [NO_ERRORS_SCHEMA], // Using NO_ERRORS_SCHEMA to avoid issues with NgIcon and other child components not critical to these tests
    }).compileComponents();

    fixture = TestBed.createComponent(PlanPickerComponent);
    component = fixture.componentInstance;

    //detectChanges to ensure viewChild queries are resolved
    fixture.detectChanges();

    // Override the viewChild signals after they have been initialized
    // This is a common way to mock signals/observables that are populated by decorators like @Input or @ViewChild
    Object.defineProperty(component, 'coffeeTemplate', {
      value: signal(mockCoffeeTemplateRef),
      writable: true,
      configurable: true,
    });
    Object.defineProperty(component, 'beverageTemplate', {
      value: signal(mockBeverageTemplateRef),
      writable: true,
      configurable: true,
    });

    // For older Angular versions or if direct signal override is problematic,
    // an alternative was to spy on the method and mock its return value if it's a function call.
    // However, with viewChild signals, they are properties.
    // (component as any).coffeeTemplate = signal(mockCoffeeTemplateRef);
    // (component as any).beverageTemplate = signal(mockBeverageTemplateRef);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should have default plans', () => {
      const expectedPlans = ['The Single', 'The Curious', 'The Addict', 'The Hacker', 'Vibe Coder'];
      expect(component.plans()).toEqual(expectedPlans);
    });

    it('should have an empty selected plan initially', () => {
      expect(component.selectedPlan()).toBe('');
    });
  });

  describe('handleSelectPlan(name: string)', () => {
    it('should update selectedPlan with the given name', () => {
      const planName = 'The Curious';
      component.handleSelectPlan(planName);
      expect(component.selectedPlan()).toBe(planName);
    });
  });

  describe('addPlan(name: string)', () => {
    it('should add the new plan name to the plans list', () => {
      const newPlanName = 'The Explorer';
      const initialPlanCount = component.plans().length;
      component.addPlan(newPlanName);
      expect(component.plans().length).toBe(initialPlanCount + 1);
      expect(component.plans()).toContain(newPlanName);
    });
  });

  // Test private method isPlanSelected via public methods getCoffeeIconTemplate and getBeverageIconTemplate

  describe('getCoffeeIconTemplate(planName: string)', () => {
    const coffeePlan = COFFEE_PLAN_PREFIX + ' Enthusiast';
    const nonCoffeePlan = 'Juice Lover';

    it('should return coffee template if plan is selected and starts with COFFEE_PLAN_PREFIX', () => {
      component.handleSelectPlan(coffeePlan);
      fixture.detectChanges(); // Ensure signal changes are processed if relevant to template logic indirectly
      expect(component.getCoffeeIconTemplate(coffeePlan)).toBe(mockCoffeeTemplateRef);
    });

    it('should return undefined if plan is selected but does not start with COFFEE_PLAN_PREFIX', () => {
      component.handleSelectPlan(nonCoffeePlan);
      fixture.detectChanges();
      expect(component.getCoffeeIconTemplate(nonCoffeePlan)).toBeUndefined();
    });

    it('should return undefined if plan is not selected', () => {
      component.handleSelectPlan(coffeePlan); // Select a plan
      fixture.detectChanges();
      // Now check for a different, unselected plan
      expect(component.getCoffeeIconTemplate('Unselected ' + COFFEE_PLAN_PREFIX + ' Plan')).toBeUndefined();
    });
     it('should return undefined if plan name starts with COFFEE_PLAN_PREFIX but is not selected', () => {
      // Ensure no plan is selected initially or select a different one
      component.handleSelectPlan('Another Plan');
      fixture.detectChanges();
      expect(component.getCoffeeIconTemplate(coffeePlan)).toBeUndefined();
    });
  });

  describe('getBeverageIconTemplate(planName: string)', () => {
    const beveragePlan = 'Smoothie Fan';
    const coffeePlan = COFFEE_PLAN_PREFIX + ' Drinker';

    it('should return beverage template if plan is selected and does not start with COFFEE_PLAN_PREFIX', () => {
      component.handleSelectPlan(beveragePlan);
      fixture.detectChanges();
      expect(component.getBeverageIconTemplate(beveragePlan)).toBe(mockBeverageTemplateRef);
    });

    it('should return undefined if plan is selected but starts with COFFEE_PLAN_PREFIX', () => {
      component.handleSelectPlan(coffeePlan);
      fixture.detectChanges();
      expect(component.getBeverageIconTemplate(coffeePlan)).toBeUndefined();
    });

    it('should return undefined if plan is not selected', () => {
      component.handleSelectPlan(beveragePlan); // Select a plan
      fixture.detectChanges();
      // Now check for a different, unselected plan
      expect(component.getBeverageIconTemplate('Unselected Beverage Plan')).toBeUndefined();
    });

    it('should return undefined if plan name does not start with COFFEE_PLAN_PREFIX but is not selected', () => {
      // Ensure no plan is selected initially or select a different one
      component.handleSelectPlan('Another Plan');
      fixture.detectChanges();
      expect(component.getBeverageIconTemplate(beveragePlan)).toBeUndefined();
    });
  });
});
