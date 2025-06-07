import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-coffee-plan',
  imports: [FormsModule],
  template: `
    <form class="add-plan-form" (ngSubmit)="addPlan()">
      <input name="newPlan" type="text" placeholder="Add a new plan" [(ngModel)]="newPlan" />
      <button
        class="btn btn-primary"
        type="submit"
        [disabled]="newPlan().length < 5"
        (mouseenter)="hover.emit(true)"
        (mouseleave)="hover.emit(false)"
      >
        <ng-content />
      </button>
    </form>
  `,
  styleUrl: './add-coffee-plan.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoffeePlanComponent {
  newPlan = signal('');

  addCoffeePlan = output<string>();

  hover = output<boolean>();

  addPlan() {
    this.addCoffeePlan.emit(this.newPlan());
    this.newPlan.set('');
  }
}
