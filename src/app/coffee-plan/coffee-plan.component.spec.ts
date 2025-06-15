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
    expect(firstChild.nativeElement.classList.contains('coffee')).withContext('First child should have class "coffee"').toBeTrue();

    // Check second child: div.description
    const secondChild = planDiv.children[1];
    expect(secondChild.name).withContext('Second child should be a div').toBe('div');
    expect(secondChild.nativeElement.classList.contains('description')).withContext('Second child should have class "description"').toBeTrue();

    // Check third child: div.beverage
    const thirdChild = planDiv.children[2];
    expect(thirdChild.name).withContext('Third child should be a div').toBe('div');
    expect(thirdChild.nativeElement.classList.contains('beverage')).withContext('Third child should have class "beverage"').toBeTrue();

    // Check total ng-icon count
    const ngIcons = planDiv.queryAll(By.css('ng-icon'));
    expect(ngIcons.length).withContext('Should be 4 ng-icon elements in total').toBe(4);
  });
});
