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
      <ng-container [ngTemplateOutlet]="selected() && name().startsWith('The') ? coffees : undefined" />
      <div class="description">
        <span class="title"> {{ name() }} </span>
      </div>
      <ng-container [ngTemplateOutlet]="selected() && !name().startsWith('The') ? beverages : undefined" />

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
