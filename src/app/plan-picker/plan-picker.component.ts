import { ChangeDetectionStrategy, Component, computed, signal, TemplateRef, viewChild } from '@angular/core';
import { AddCoffeePlanComponent } from '../add-coffee-plan/add-coffee-plan.component';
import { CoffeePlanComponent } from '../coffee-plan/coffee-plan.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCoffeeMakerOutline,
  matCoffeeOutline,
  matEmojiFoodBeverageOutline,
  matFastfoodOutline,
} from '@ng-icons/material-icons/outline';

const COFFEE_PLAN_PREFIX = 'The';

@Component({
  selector: 'app-plan-picker',
  imports: [CoffeePlanComponent, AddCoffeePlanComponent, NgIcon],
  viewProviders: [
    provideIcons({ matCoffeeOutline, matCoffeeMakerOutline, matEmojiFoodBeverageOutline, matFastfoodOutline }),
  ],
  template: `
    <div class="plans">
      <app-add-coffee-plan (addCoffeePlan)="addPlan($event)" (hover)="hover.set($event)">
        {{ addPlanText() }}
      </app-add-coffee-plan>
      {{ selectedPlan() }}
      @for (plan of plans(); track plan) {
        <app-coffee-plan
          [name]="plan"
          (selectedPlan)="handleSelectPlan($event)"
          [selected]="isPlanSelected(plan)"
          [beverage]="getBeverageIconTemplate(plan)"
          [coffee]="getCoffeeIconTemplate(plan)"
        />
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
  coffeeTemplate = viewChild.required<TemplateRef<any>>('coffee');
  beverageTemplate = viewChild.required<TemplateRef<any>>('beverage');

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

  isPlanSelected(planName: string): boolean {
    return this.selectedPlan() === planName;
  }

  getCoffeeIconTemplate(planName: string): TemplateRef<any> | undefined {
    return this.isPlanSelected(planName) && planName.startsWith(COFFEE_PLAN_PREFIX) ? this.coffeeTemplate() : undefined;
  }

  getBeverageIconTemplate(planName: string): TemplateRef<any> | undefined {
    return this.isPlanSelected(planName) && !planName.startsWith(COFFEE_PLAN_PREFIX)
      ? this.beverageTemplate()
      : undefined;
  }
}
