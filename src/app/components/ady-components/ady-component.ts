import { Component, EventEmitter, Output } from '@angular/core';
import { CompletionBarComponent } from '../completion-bar-component/completion-bar-component';
import { HeatmapComponent } from '../map-heatmap/map-heatmap-component.component';

@Component({
  selector: 'ady-component',
  imports: [CompletionBarComponent, HeatmapComponent],
  template: `<heatmap-component></heatmap-component>
    <completion-bar
      [segments]="5"
      [completionEvent]="triggerMove"
      (stepChanged)="onStepChanged($event)"
    ></completion-bar>
    <button (click)="trigger()">Complete</button>`,
  styles: ``,
})
export class AdyComponent {
  @Output() completionEvent = new EventEmitter<boolean>();
  triggerMove: boolean = false;
  trigger() {
    this.triggerMove = true;
    setTimeout(() => (this.triggerMove = false)); // Reset for next event
    this.completionEvent.emit(this.triggerMove);
  }
  onStepChanged(step: number) {
    console.log('Moved to step:', step);
  }
}
