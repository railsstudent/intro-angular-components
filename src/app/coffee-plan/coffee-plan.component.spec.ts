import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, TemplateRef, signal, provideZonelessChangeDetection, viewChild } from '@angular/core';
import { CoffeePlanComponent } from './coffee-plan.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCoffeeOutline,
  matCoffeeMakerOutline,
  matEmojiFoodBeverageOutline,
  matFastfoodOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  standalone: true,
  imports: [CoffeePlanComponent, NgIcon],
  template: `
    <app-coffee-plan [name]="planName()" [selected]="isSelected()" [coffee]="coffeeTemplateRef()" [beverage]="beverageTemplateRef()"></app-coffee-plan>
    <ng-template #coffee>
      <div class="coffee">
        <ng-icon name="matCoffeeOutline" />
        <ng-icon name="matCoffeeMakerOutline" />
      </div>
    </ng-template>
    <ng-template #beverage>
      <div class="beverage">
        <ng-icon name="matEmojiFoodBeverageOutline" />
        <ng-icon name="matFastfoodOutline" />
      </div>
    </ng-template>
  `,
})
class TestHostComponent {
  planName = signal('Default Plan');
  isSelected = signal(false);

  coffeeTemplateRef = viewChild.required<TemplateRef<any>>('coffee');
  beverageTemplateRef = viewChild.required<TemplateRef<any>>('beverage');
}

describe('CoffeePlanComponent with .coffee and .beverage Classes', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent], // CoffeePlanComponent removed
      imports: [NgIcon], // NgIcon might be needed for the test setup itself, TestHostComponent handles its own
      providers: [
        provideZonelessChangeDetection(),
        provideIcons({
          matCoffeeOutline,
          matCoffeeMakerOutline,
          matEmojiFoodBeverageOutline,
          matFastfoodOutline,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    componentDebugElement = fixture.debugElement.query(By.directive(CoffeePlanComponent));
    // fixture.detectChanges(); // Moved to individual tests or describe blocks after setting inputs
  });

  const getPlanDivChildren = (): DebugElement[] => {
    const planDiv = componentDebugElement.query(By.css('.plan'));
    return planDiv.children;
  };

  const getIconWrapperDivByIconName = (iconName: string): DebugElement | null => {
    const iconEl = componentDebugElement.query(By.css(`ng-icon[name="${iconName}"]`));
    return iconEl ? iconEl.parent : null;
  };

  const getIconElementByName = (iconName: string): DebugElement | null => {
    return componentDebugElement.query(By.css(`ng-icon[name="${iconName}"]`));
  };

  it('should create the component', () => {
    expect(componentDebugElement.componentInstance).toBeTruthy();
  });

  it("should have 'plan' and 'active-plan' classes when isSelected is true", () => {
    testHost.isSelected.set(true);
    fixture.detectChanges(); // Ensure change detection is run after setting input

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).toBeTruthy(); // Ensure the element exists
    expect(planDiv.nativeElement.classList.contains('plan')).toBeTrue();
    expect(planDiv.nativeElement.classList.contains('active-plan')).toBeTrue();
  });

  it("should have only 'plan' class and not 'active-plan' when isSelected is false", () => {
    testHost.isSelected.set(false);
    fixture.detectChanges(); // Ensure change detection is run after setting input

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).toBeTruthy(); // Ensure the element exists
    expect(planDiv.nativeElement.classList.contains('plan')).toBeTrue();
    expect(planDiv.nativeElement.classList.contains('active-plan')).toBeFalse();
  });

  describe('When plan is selected and name starts with "The"', () => {
    let coffeeIconWrapper: DebugElement | null;
    let descriptionDiv: DebugElement | null;

    beforeEach(() => {
      testHost.planName.set('The Premium Blend');
      testHost.isSelected.set(true);
      // coffeeTemplateRef and beverageTemplateRef are now directly passed.
      // fixture.detectChanges(); // Call after inputs are set if needed for specific test logic.
      fixture.detectChanges();
      coffeeIconWrapper = getIconWrapperDivByIconName('matCoffeeOutline');
      descriptionDiv = componentDebugElement.query(By.css('.description'));
    });

    it('should display matCoffeeOutline and matCoffeeMakerOutline icons', () => {
      expect(getIconElementByName('matCoffeeOutline')).toBeTruthy();
      expect(getIconElementByName('matCoffeeMakerOutline')).toBeTruthy();
    });

    it('coffee icons div should be before description div and have class "coffee"', () => {
      const children = getPlanDivChildren();
      const coffeeDivIndex = children.findIndex((el) => el === coffeeIconWrapper);
      const descriptionDivIndex = children.findIndex((el) => el === descriptionDiv);
      expect(coffeeDivIndex).not.toBe(-1, 'Coffee div wrapper not found');
      expect(descriptionDivIndex).not.toBe(-1, 'Description div not found');
      expect(coffeeDivIndex).toBeLessThan(descriptionDivIndex);
      expect(coffeeIconWrapper?.classes['coffee']).toBeTrue();
      expect(coffeeIconWrapper?.classes['beverage']).toBeFalsy(); // Ensure it doesn't also have .beverage
    });

    it('icons should have width="48" and height="48"', () => {
      const coffeeIcon = getIconElementByName('matCoffeeOutline');
      expect(coffeeIcon?.attributes['width']).toBe('48');
      expect(coffeeIcon?.attributes['height']).toBe('48');
      const makerIcon = getIconElementByName('matCoffeeMakerOutline');
      expect(makerIcon?.attributes['width']).toBe('48');
      expect(makerIcon?.attributes['height']).toBe('48');
    });

    it('should NOT display beverage icons or their .beverage wrapper', () => {
      expect(getIconElementByName('matEmojiFoodBeverageOutline')).toBeNull();
      expect(getIconElementByName('matFastfoodOutline')).toBeNull();
      expect(componentDebugElement.query(By.css('.beverage'))).toBeNull();
    });
  });

  describe('When plan is selected and name does NOT start with "The"', () => {
    let beverageIconWrapper: DebugElement | null;
    let descriptionDiv: DebugElement | null;

    beforeEach(() => {
      testHost.planName.set('Casual Cup');
      testHost.isSelected.set(true);
      // coffeeTemplateRef and beverageTemplateRef are now directly passed.
      // fixture.detectChanges(); // Call after inputs are set if needed for specific test logic.
      fixture.detectChanges();
      beverageIconWrapper = getIconWrapperDivByIconName('matEmojiFoodBeverageOutline');
      descriptionDiv = componentDebugElement.query(By.css('.description'));
    });

    it('should display matEmojiFoodBeverageOutline and matFastfoodOutline icons', () => {
      expect(getIconElementByName('matEmojiFoodBeverageOutline')).toBeTruthy();
      expect(getIconElementByName('matFastfoodOutline')).toBeTruthy();
    });

    it('beverage icons div should be after description div and have class "beverage"', () => {
      const children = getPlanDivChildren();
      const beverageDivIndex = children.findIndex((el) => el === beverageIconWrapper);
      const descriptionDivIndex = children.findIndex((el) => el === descriptionDiv);
      expect(beverageDivIndex).not.toBe(-1, 'Beverage div wrapper not found');
      expect(descriptionDivIndex).not.toBe(-1, 'Description div not found');
      expect(beverageDivIndex).toBeGreaterThan(descriptionDivIndex);
      expect(beverageIconWrapper?.classes['beverage']).toBeTrue();
      expect(beverageIconWrapper?.classes['coffee']).toBeFalsy(); // Ensure it doesn't also have .coffee
    });

    it('icons should have width="42", height="42", and color="green"', () => {
      const beverageIconEl = getIconElementByName('matEmojiFoodBeverageOutline');
      expect(beverageIconEl?.attributes['width']).toBe('42');
      expect(beverageIconEl?.attributes['height']).toBe('42');
      expect(beverageIconEl?.attributes['color']).toBe('green');
      const fastfoodIconEl = getIconElementByName('matFastfoodOutline');
      expect(fastfoodIconEl?.attributes['width']).toBe('42');
      expect(fastfoodIconEl?.attributes['height']).toBe('42');
      expect(fastfoodIconEl?.attributes['color']).toBe('green');
    });

    it('should NOT display coffee icons or their .coffee wrapper', () => {
      expect(getIconElementByName('matCoffeeOutline')).toBeNull();
      expect(getIconElementByName('matCoffeeMakerOutline')).toBeNull();
      expect(componentDebugElement.query(By.css('.coffee'))).toBeNull();
    });
  });

  describe('When plan is NOT selected', () => {
    it('should display only the description div for "The" plan', () => {
      testHost.planName.set('The Premium Blend');
      testHost.isSelected.set(false);
      // coffeeTemplateRef and beverageTemplateRef are directly passed.
      // No need to set them to undefined here as they are required ViewChilds.
      // fixture.detectChanges(); // Call after inputs are set if needed for specific test logic.
      fixture.detectChanges();
      const children = getPlanDivChildren();
      expect(children.length).toBe(1);
      expect(children[0].classes['description']).toBeTrue();
      expect(componentDebugElement.queryAll(By.css('ng-icon')).length).toBe(0);
    });

    it('should display only the description div for non-"The" plan', () => {
      testHost.planName.set('Casual Cup');
      testHost.isSelected.set(false);
      // coffeeTemplateRef and beverageTemplateRef are directly passed.
      // No need to set them to undefined here as they are required ViewChilds.
      // fixture.detectChanges(); // Call after inputs are set if needed for specific test logic.
      fixture.detectChanges();
      const children = getPlanDivChildren();
      expect(children.length).toBe(1);
      expect(children[0].classes['description']).toBeTrue();
      expect(componentDebugElement.queryAll(By.css('ng-icon')).length).toBe(0);
    });
  });
});
