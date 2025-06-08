import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AddCoffeePlanComponent } from '../add-coffee-plan/add-coffee-plan.component';
import { CoffeePlanComponent } from '../coffee-plan/coffee-plan.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCoffeeMakerOutline, matCoffeeOutline, matEmojiFoodBeverageOutline, matFastfoodOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-plan-picker',
  imports: [CoffeePlanComponent, AddCoffeePlanComponent, NgIcon],
  viewProviders: [provideIcons({ matCoffeeOutline, matCoffeeMakerOutline, matEmojiFoodBeverageOutline, matFastfoodOutline })],
  template: `
    <div class="plans">
      <app-add-coffee-plan (addCoffeePlan)="addPlan($event)" />
      {{selectedPlan()}}
      @for (plan of plans(); track plan) {
        @let coffeeIcons = showCoffeeIcons(plan) ? coffee : undefined; 
        @let beverageIcons = showBeverageIcons(plan) ? beverage : undefined;
        <app-coffee-plan [name]="plan" (selectedPlan)="handleSelectPlan($event)" [selected]="selectedPlan() === plan"
          [beverage]="beverageIcons" [coffee]="coffeeIcons" />
      }

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
    </div>
  `,
  styleUrl: './plan-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPickerComponent {
  plans = signal(['The Single', 'The Curious', 'The Addict', 'The Hacker', 'Vibe Coder']);

  selectedPlan = signal('');

  handleSelectPlan(name: string) {
    this.selectedPlan.set(name);
  }

  addPlan(name: string) {
    this.plans.update((plans) => [...plans, name]);
  }

  showCoffeeIcons(name: string, pattern = 'The'): boolean {
    return this.selectedPlan() === name && name.startsWith(pattern);
  }

  showBeverageIcons(name: string, pattern = 'The'): boolean {
    return this.selectedPlan() === name && !name.startsWith(pattern);
  }
}
