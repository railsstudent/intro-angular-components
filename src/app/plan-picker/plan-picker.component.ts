import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AddCoffeePlanComponent } from '../add-coffee-plan/add-coffee-plan.component';
import { CoffeePlanComponent } from '../coffee-plan/coffee-plan.component';

@Component({
  selector: 'app-plan-picker',
  imports: [CoffeePlanComponent, AddCoffeePlanComponent],
  template: `
    <div class="plans">
      <app-add-coffee-plan (addCoffeePlan)="addPlan($event)" (hover)="hover.set($event)">
        {{ addPlanText() }}
      </app-add-coffee-plan>
      {{ selectedPlan() }}
      @for (plan of plans(); track plan) {
        @let isSelected = selectedPlan() === plan;
        <app-coffee-plan [name]="plan" (selectedPlan)="handleSelectPlan($event)" [selected]="isSelected" />
      }
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
