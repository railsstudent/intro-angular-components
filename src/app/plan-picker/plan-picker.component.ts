import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CoffeePlanComponent } from '../coffee-plan/coffee-plan.component';

@Component({
  selector: 'app-plan-picker',
  imports: [CoffeePlanComponent],
  template: `
    <div class="plans">
      @for (plan of plans(); track plan) {
        <app-coffee-plan [name]="plan" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPickerComponent {
  plans = signal(['The Single', 'The Curious', 'The Addict', 'The Hacker']);
}
