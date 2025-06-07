import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCoffeeOutline, matCoffeeMakerOutline, matEmojiFoodBeverageOutline, matFastfoodOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-coffee-plan',
  imports: [NgIcon],
  template: `
    <div class="plan" (click)="selectPlan()" [class]="{ 'active-plan': selected() }">
      @if (isShowCoffee()) {
        <div class="coffee">
          <ng-icon name="matCoffeeOutline" width="48" height="48" />
          <ng-icon name="matCoffeeMakerOutline" width="48" height="48" />
        </div>
      }
      <div class="description">
        <span class="title"> {{ name() }} </span>
      </div>
      @if (isShowBeverage()) {
        <div class="beverage">
          <ng-icon name="matEmojiFoodBeverageOutline" width="42" height="42" color="green" />
          <ng-icon name="matFastfoodOutline" width="42" height="42" color="green" />
        </div>
      }
    </div>
  `,
  styles: [`
    .beverage {
      display: flex;
      flex-direction: column;
      padding: 0.25rem;
    }
    .coffee {
      display: flex;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ matCoffeeOutline, matCoffeeMakerOutline, matEmojiFoodBeverageOutline, matFastfoodOutline })]
})
export class CoffeePlanComponent {
  name = input('Default Plan');
  selected = input(false);

  isShowCoffee = computed(() => this.selected() && this.name().startsWith('The'));
  isShowBeverage = computed(() => this.selected() && !this.name().startsWith('The'));

  selectedPlan = output<string>();

  selectPlan() {
    this.selectedPlan.emit(this.name());
  }
}
