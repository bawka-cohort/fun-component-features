import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  // mark this as a standalone component so it can be bootstrapped
  standalone: true,
  // Angular expects an array for external style files
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('dietary-interface-page');

  // toggle state for an on/off button
  protected readonly isOn = signal(false);

  protected toggle(): void {
    this.isOn.set(!this.isOn());
    console.log(`Toggle is now: ${this.isOn() ? 'ON' : 'OFF'}`);
  }

  // list of dietary options (rendered as buttons)
  protected readonly options = [
    'Nut Free',
    'Dairy Free',
    'Gluten Free',
    'Egg Free',
    'Halal',
    'Plant Based',
    'Lactose Free',
    'Vegan',
    'Vegetarian',
    'Keto',
    'Kosher Food'
  ];

  // track which options are active using a Set stored in a signal
  protected readonly active = signal(new Set<string>());

  protected isActive(option: string): boolean {
    return this.active().has(option);
  }

  protected toggleOption(option: string): void {
    const copy = new Set(this.active());
    if (copy.has(option)) copy.delete(option);
    else copy.add(option);
    this.active.set(copy);
    console.log(`${option} active: ${copy.has(option)}`);
  }
}
