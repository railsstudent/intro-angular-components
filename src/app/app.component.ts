import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlanPickerComponent } from './plan-picker/plan-picker.component';

@Component({
  selector: 'app-root',
  imports: [PlanPickerComponent],
  template: `
    <div class="content">
      <h1 class="title">Coffee Plans - Angular</h1>

      <h2 class="subtitle">We travel the world to source the very best single origin coffee for you</h2>

      <app-plan-picker />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
