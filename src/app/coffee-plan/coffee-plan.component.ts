import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-coffee-plan',
  imports: [NgTemplateOutlet],
  template: `
    <div class="plan" (click)="selectPlan()" [class]="{ 'active-plan': selected() }">
      <ng-container [ngTemplateOutlet]="coffeeTemplate()" />
      <div class="description">
        <span class="title"> {{ name() }} </span>
      </div>
      <ng-container [ngTemplateOutlet]="beverageTemplate()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeePlanComponent {
  name = input('Default Plan');
  selected = input(false);
  coffeeTemplate = input<TemplateRef<any> | undefined>(undefined);
  beverageTemplate = input<TemplateRef<any> | undefined>(undefined);

  selectedPlan = output<string>();

  selectPlan() {
    this.selectedPlan.emit(this.name());
  }
}
