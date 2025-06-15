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
    <app-coffee-plan
      [name]="planName()"
      [selected]="isSelected()"
      [coffee]="passCoffeeTemplate() ? coffeeTemplateRef() : undefined"
      [beverage]="passBeverageTemplate() ? beverageTemplateRef() : undefined"
    >
    </app-coffee-plan>
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
  passCoffeeTemplate = signal(true);
  passBeverageTemplate = signal(true);

  coffeeTemplateRef = viewChild.required<TemplateRef<any>>('coffee');
  beverageTemplateRef = viewChild.required<TemplateRef<any>>('beverage');
}

describe('CoffeePlanComponent with .coffee and .beverage Classes', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let componentDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [], // TestHostComponent removed as it's standalone
      imports: [NgIcon, TestHostComponent], // NgIcon for root icons, TestHostComponent because it's standalone
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

  it('should have correct structure and icon count when all elements are rendered', () => {
    // Ensure the component is in a state to render coffee and beverage sections
    testHost.isSelected.set(true);
    // The TestHostComponent already provides coffeeTemplateRef and beverageTemplateRef
    // which contain 2 ng-icons each.

    fixture.detectChanges();

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).withContext('Could not find .plan div').toBeTruthy();

    // Check for 3 direct children
    expect(planDiv.children.length).withContext('.plan div should have 3 children').toBe(3);

    // Check first child: div.coffee
    const firstChild = planDiv.children[0];
    expect(firstChild.name).withContext('First child should be a div').toBe('div');
    expect(firstChild.nativeElement.classList.contains('coffee'))
      .withContext('First child should have class "coffee"')
      .toBeTrue();

    // Check second child: div.description
    const secondChild = planDiv.children[1];
    expect(secondChild.name).withContext('Second child should be a div').toBe('div');
    expect(secondChild.nativeElement.classList.contains('description'))
      .withContext('Second child should have class "description"')
      .toBeTrue();

    // Check third child: div.beverage
    const thirdChild = planDiv.children[2];
    expect(thirdChild.name).withContext('Third child should be a div').toBe('div');
    expect(thirdChild.nativeElement.classList.contains('beverage'))
      .withContext('Third child should have class "beverage"')
      .toBeTrue();

    // Check total ng-icon count
    const ngIcons = planDiv.queryAll(By.css('ng-icon'));
    expect(ngIcons.length).withContext('Should be 4 ng-icon elements in total').toBe(4);
  });

  it('should display correct icons in the coffee section', () => {
    testHost.isSelected.set(true);
    fixture.detectChanges();

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).withContext('Could not find .plan div').toBeTruthy();

    const coffeeDiv = planDiv.query(By.css('div.coffee'));
    expect(coffeeDiv).withContext('Could not find div.coffee').toBeTruthy();

    const coffeeIcons = coffeeDiv.queryAll(By.css('ng-icon'));
    expect(coffeeIcons.length).withContext('div.coffee should have 2 ng-icon elements').toBe(2);

    expect(coffeeIcons[0].attributes['name'])
      .withContext('First icon in div.coffee should be matCoffeeOutline')
      .toBe('matCoffeeOutline');
    expect(coffeeIcons[1].attributes['name'])
      .withContext('Second icon in div.coffee should be matCoffeeMakerOutline')
      .toBe('matCoffeeMakerOutline');
  });

  it('should display correct icons in the beverage section', () => {
    testHost.isSelected.set(true);
    fixture.detectChanges();

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).withContext('Could not find .plan div').toBeTruthy();

    const beverageDiv = planDiv.query(By.css('div.beverage'));
    expect(beverageDiv).withContext('Could not find div.beverage').toBeTruthy();

    const beverageIcons = beverageDiv.queryAll(By.css('ng-icon'));
    expect(beverageIcons.length).withContext('div.beverage should have 2 ng-icon elements').toBe(2);

    expect(beverageIcons[0].attributes['name'])
      .withContext('First icon in div.beverage should be matEmojiFoodBeverageOutline')
      .toBe('matEmojiFoodBeverageOutline');
    expect(beverageIcons[1].attributes['name'])
      .withContext('Second icon in div.beverage should be matFastfoodOutline')
      .toBe('matFastfoodOutline');
  });

  it('should render correctly when coffee input is undefined', () => {
    testHost.isSelected.set(true);
    testHost.passCoffeeTemplate.set(false); // Coffee template will not be passed
    testHost.passBeverageTemplate.set(true); // Beverage template will be passed
    fixture.detectChanges();

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).withContext('Could not find .plan div').toBeTruthy();

    // Check for 2 direct children: description, beverage
    expect(planDiv.children.length).withContext('.plan div should have 2 children when coffee is undefined').toBe(2);

    // Check first child: div.description
    const firstChild = planDiv.children[0];
    expect(firstChild.name).withContext('First child should be a div').toBe('div');
    expect(firstChild.nativeElement.classList.contains('description'))
      .withContext('First child should have class "description"')
      .toBeTrue();

    // Check second child: div.beverage
    const secondChild = planDiv.children[1];
    expect(secondChild.name).withContext('Second child should be a div').toBe('div');
    expect(secondChild.nativeElement.classList.contains('beverage'))
      .withContext('Second child should have class "beverage"')
      .toBeTrue();

    // Check total ng-icon count (should be from beverage template only)
    const ngIcons = planDiv.queryAll(By.css('ng-icon'));
    expect(ngIcons.length).withContext('Should be 2 ng-icon elements (from beverage) when coffee is undefined').toBe(2);

    // Verify beverage icons
    const beverageDiv = secondChild; // Already identified as div.beverage
    const beverageIcons = beverageDiv.queryAll(By.css('ng-icon')); // Icons specifically within beverageDiv
    expect(beverageIcons.length).withContext('div.beverage should contain 2 ng-icons').toBe(2);
    expect(beverageIcons[0].attributes['name'])
      .withContext('First icon in div.beverage should be matEmojiFoodBeverageOutline')
      .toBe('matEmojiFoodBeverageOutline');
    expect(beverageIcons[1].attributes['name'])
      .withContext('Second icon in div.beverage should be matFastfoodOutline')
      .toBe('matFastfoodOutline');
  });

  it('should render correctly when beverage input is undefined', () => {
    testHost.isSelected.set(true);
    testHost.passCoffeeTemplate.set(true); // Coffee template will be passed
    testHost.passBeverageTemplate.set(false); // Beverage template will not be passed
    fixture.detectChanges();

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).withContext('Could not find .plan div').toBeTruthy();

    // Check for 2 direct children: coffee, description
    expect(planDiv.children.length).withContext('.plan div should have 2 children when beverage is undefined').toBe(2);

    // Check first child: div.coffee
    const firstChild = planDiv.children[0];
    expect(firstChild.name).withContext('First child should be a div').toBe('div');
    expect(firstChild.nativeElement.classList.contains('coffee'))
      .withContext('First child should have class "coffee"')
      .toBeTrue();

    // Check second child: div.description
    const secondChild = planDiv.children[1];
    expect(secondChild.name).withContext('Second child should be a div').toBe('div');
    expect(secondChild.nativeElement.classList.contains('description'))
      .withContext('Second child should have class "description"')
      .toBeTrue();

    // Check total ng-icon count (should be from coffee template only)
    const ngIcons = planDiv.queryAll(By.css('ng-icon'));
    expect(ngIcons.length).withContext('Should be 2 ng-icon elements (from coffee) when beverage is undefined').toBe(2);

    // Verify coffee icons
    const coffeeDiv = firstChild; // Already identified as div.coffee
    const coffeeIcons = coffeeDiv.queryAll(By.css('ng-icon')); // Icons specifically within coffeeDiv
    expect(coffeeIcons.length).withContext('div.coffee should contain 2 ng-icons').toBe(2);
    expect(coffeeIcons[0].attributes['name'])
      .withContext('First icon in div.coffee should be matCoffeeOutline')
      .toBe('matCoffeeOutline');
    expect(coffeeIcons[1].attributes['name'])
      .withContext('Second icon in div.coffee should be matCoffeeMakerOutline')
      .toBe('matCoffeeMakerOutline');
  });

  it('should render correctly when both coffee and beverage inputs are undefined', () => {
    testHost.isSelected.set(true); // Description should still show if selected
    testHost.passCoffeeTemplate.set(false); // Coffee template will not be passed
    testHost.passBeverageTemplate.set(false); // Beverage template will not be passed
    fixture.detectChanges();

    const planDiv = componentDebugElement.query(By.css('.plan'));
    expect(planDiv).withContext('Could not find .plan div').toBeTruthy();

    // Check for 1 direct child: description
    expect(planDiv.children.length)
      .withContext('.plan div should have 1 child when both coffee and beverage are undefined')
      .toBe(1);

    // Check only child: div.description
    const firstChild = planDiv.children[0];
    expect(firstChild.name).withContext('Only child should be a div').toBe('div');
    expect(firstChild.nativeElement.classList.contains('description'))
      .withContext('Only child should have class "description"')
      .toBeTrue();

    // Check total ng-icon count (should be zero)
    const ngIcons = planDiv.queryAll(By.css('ng-icon'));
    expect(ngIcons.length)
      .withContext('Should be 0 ng-icon elements when both coffee and beverage are undefined')
      .toBe(0);
  });
});
