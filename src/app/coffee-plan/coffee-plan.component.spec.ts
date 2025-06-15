import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { CoffeePlanComponent } from './coffee-plan.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCoffeeOutline,
  matCoffeeMakerOutline,
  matEmojiFoodBeverageOutline,
  matFastfoodOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  template: `<app-coffee-plan [name]="planName" [selected]="isSelected"></app-coffee-plan>`,
})
class TestHostComponent {
  planName: string = 'Default Plan';
  isSelected: boolean = false;
}

describe('CoffeePlanComponent with .coffee and .beverage Classes', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeePlanComponent, TestHostComponent],
      imports: [NgIcon],
      providers: [
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
    fixture.detectChanges();
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

  describe('When plan is selected and name starts with "The"', () => {
    let coffeeIconWrapper: DebugElement | null;
    let descriptionDiv: DebugElement | null;

    beforeEach(() => {
      testHost.planName = 'The Premium Blend';
      testHost.isSelected = true;
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
      testHost.planName = 'Casual Cup';
      testHost.isSelected = true;
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
      testHost.planName = 'The Premium Blend';
      testHost.isSelected = false;
      fixture.detectChanges();
      const children = getPlanDivChildren();
      expect(children.length).toBe(1);
      expect(children[0].classes['description']).toBeTrue();
      expect(componentDebugElement.queryAll(By.css('ng-icon')).length).toBe(0);
    });

    it('should display only the description div for non-"The" plan', () => {
      testHost.planName = 'Casual Cup';
      testHost.isSelected = false;
      fixture.detectChanges();
      const children = getPlanDivChildren();
      expect(children.length).toBe(1);
      expect(children[0].classes['description']).toBeTrue();
      expect(componentDebugElement.queryAll(By.css('ng-icon')).length).toBe(0);
    });
  });
});
