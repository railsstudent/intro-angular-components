import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CoffeePlanComponent } from './coffee-plan/coffee-plan.component';

@Component({
  selector: 'app-root',
  imports: [CoffeePlanComponent],
  template: `
    <div class="content">
      <h1 class="title">Coffee Plans</h1>

      <h2 class="subtitle">We travel the world to source the very best single origin coffee for you</h2>

      <div class="plans">
        @for (plan of plans(); track plan) {
          <app-coffee-plan [name]="plan" />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  plans = signal(['The Single', 'The Curious', 'The Addict', 'The Hacker']);
}
