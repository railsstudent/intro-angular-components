import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-coffee-plan',
  imports: [],
  template: `
    <div class="plan">
      <div class="description">
        <span class="title"> {{ name() }} </span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoffeePlanComponent {
  name = input('Default Plan');
}
