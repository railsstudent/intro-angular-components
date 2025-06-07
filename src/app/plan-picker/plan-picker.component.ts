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
        @let coffeeTemplate = isSelected && plan.startsWith('The') ? coffee : undefined;
        @let beverageTemplate = isSelected && !plan.startsWith('The') ? beverage : undefined;
        <app-coffee-plan
          [name]="plan"
          (selectedPlan)="handleSelectPlan($event)"
          [selected]="isSelected"
          [coffeeTemplate]="coffeeTemplate"
          [beverageTemplate]="beverageTemplate"
        />
      }
      <ng-template #coffee>
        <div class="coffee">
          @for (iconName of ['matCoffeeOutline', 'matCoffeeMakerOutline']; track iconName) {
            <ng-icon class="icon" [name]="iconName" />
          }
        </div>
      </ng-template>

      <ng-template #beverage>
        <div class="beverage">
          @for (iconName of ['matEmojiFoodBeverageOutline', 'matFastfoodOutline']; track iconName) {
            <ng-icon class="icon" [name]="iconName" />
          }
        </div>
      </ng-template>
    </div>
  `,
  styles: `
    .coffee {
      flex: display;
      align-items: center;

      > .icon {
        width: 48px;
        height: 48px;
        color: brown;
      }
    }

    .beverage {
      display: flex;
      flex-direction: column;
      padding: 0.25rem;

      > .icon {
        width: 42px;
        height: 42px;
        color: green;
      }
    }
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
