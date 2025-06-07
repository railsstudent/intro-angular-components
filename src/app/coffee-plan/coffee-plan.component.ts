import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCoffeeMakerOutline,
  matCoffeeOutline,
  matEmojiFoodBeverageOutline,
  matFastfoodOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-coffee-plan',
  imports: [NgIcon, NgTemplateOutlet],
  viewProviders: [
    provideIcons({ matCoffeeMakerOutline, matCoffeeOutline, matEmojiFoodBeverageOutline, matFastfoodOutline }),
  ],
  template: `
    <div class="plan" (click)="selectPlan()" [class]="{ 'active-plan': selected() }">
      <ng-container
        [ngTemplateOutlet]="selected() ? icons : undefined"
        [ngTemplateOutletContext]="{ $implicit: iconNames() }"
      />
      <div class="description">
        <span class="title"> {{ name() }} </span>
      </div>

      <ng-template #icons let-iconNames>
        <div icons>
          @for (iconName of iconNames; track iconName) {
            <ng-icon [name]="iconName" style="width: 48px; height: 48px;" />
          }
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeePlanComponent {
  name = input('Default Plan');
  selected = input(false);

  selectedPlan = output<string>();

  iconNames = computed(() => {
    if (this.selected()) {
      return this.name().startsWith('The')
        ? ['matCoffeeMakerOutline', 'matCoffeeOutline']
        : ['matEmojiFoodBeverageOutline', 'matFastfoodOutline'];
    }
    return undefined;
  });

  selectPlan() {
    this.selectedPlan.emit(this.name());
  }
}
