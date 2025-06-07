import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AddCoffeePlanComponent } from '../add-coffee-plan/add-coffee-plan.component';
import { CoffeePlanComponent } from '../coffee-plan/coffee-plan.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCoffeeMakerOutline,
  matCoffeeOutline,
  matEmojiFoodBeverageOutline,
  matFastfoodOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-plan-picker',
  imports: [NgIcon, CoffeePlanComponent, AddCoffeePlanComponent],
  viewProviders: [
    provideIcons({ matCoffeeMakerOutline, matCoffeeOutline, matEmojiFoodBeverageOutline, matFastfoodOutline }),
  ],
  template: `
    <div class="plans">
      <app-add-coffee-plan (addCoffeePlan)="addPlan($event)" (hover)="hover.set($event)">
        {{ addPlanText() }}
      </app-add-coffee-plan>
      {{ selectedPlan() }}
      @for (plan of plans(); track plan) {
        @let isSelected = selectedPlan() === plan;
        @let coffeeTemplate = isSelected && plan.startsWith('The') ? coffees : undefined;
        @let beverageTemplate = isSelected && !plan.startsWith('The') ? beverages : undefined;
        <app-coffee-plan
          [name]="plan"
          (selectedPlan)="handleSelectPlan($event)"
          [selected]="isSelected"
          [coffeeTemplate]="coffeeTemplate"
          [beverageTemplate]="beverageTemplate"
        />
      }
      <ng-template #coffees>
        <div class="coffee">
          @for (iconName of ['matCoffeeOutline', 'matCoffeeMakerOutline']; track iconName) {
            <ng-icon class="icon" [name]="iconName" />
          }
        </div>
      </ng-template>

      <ng-template #beverages>
        <div class="beverage">
          @for (iconName of ['matEmojiFoodBeverageOutline', 'matFastfoodOutline']; track iconName) {
            <ng-icon class="icon" [name]="iconName" />
          }
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPickerComponent {
  plans = signal(['The Single', 'The Curious', 'The Addict', 'The Hacker', 'Vibe Coder']);

  selectedPlan = signal('');
  hover = signal(false);

  addPlanText = computed(() => `Add Plan ${this.hover() ? '(+1)' : ''}`);

  handleSelectPlan(name: string) {
    this.selectedPlan.set(name);
  }

  addPlan(name: string) {
    this.plans.update((plans) => [...plans, name]);
  }
}
