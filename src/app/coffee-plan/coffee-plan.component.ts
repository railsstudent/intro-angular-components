import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-coffee-plan',
  imports: [NgTemplateOutlet],
  template: `
    <div class="plan" (click)="selectPlan()" [class]="{ 'active-plan': selected() }">
<<<<<<< HEAD
      <ng-container [ngTemplateOutlet]="coffee()" />
      <div class="description">
        <span class="title"> {{ name() }} </span>
      </div>
      <ng-container [ngTemplateOutlet]="beverage()" />
=======
      <ng-container [ngTemplateOutlet]="coffeeTemplate()" />
      <div class="description">
        <span class="title"> {{ name() }} </span>
      </div>
      <ng-container [ngTemplateOutlet]="beverageTemplate()" />
>>>>>>> main
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeePlanComponent {
  name = input('Default Plan');
  selected = input(false);
<<<<<<< HEAD
  coffee = input<TemplateRef<any> | undefined>(undefined);
  beverage = input<TemplateRef<any> | undefined>(undefined);
=======
  coffeeTemplate = input<TemplateRef<any> | undefined>(undefined);
  beverageTemplate = input<TemplateRef<any> | undefined>(undefined);
>>>>>>> main

  selectedPlan = output<string>();

  selectPlan() {
    this.selectedPlan.emit(this.name());
  }
}
