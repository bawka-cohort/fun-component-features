import { Component, EventEmitter, Output } from '@angular/core';
import { CompletionBarComponent } from '../completion-bar-component/completion-bar-component';
import { LoginComponent } from '../login-component/login-component';

@Component({
  selector: 'ady-component',
  imports: [CompletionBarComponent, LoginComponent],
  template: `
    <div class="ady-component flex flex-col items-center justify-center space-y-4 min-h-screen">
      <login-component></login-component>
      <completion-bar
        [segments]="4"
        [completionEvent]="triggerMove"
        [goBackEvent]="triggerBack"
        (stepChanged)="onStepChanged($event)"
      >
      </completion-bar>
      <button (click)="trigger()" class="rounded bg-blue-500 px-4 py-2 text-white">Complete</button>
      <button (click)="goBack()" class="rounded bg-blue-500 px-4 py-2 text-white">Previous Step</button>
    </div>
  `,
  styles: `
    .ady-component {
      width: 390px;
    }`,
})
export class AdyComponent {
  @Output() completionEvent = new EventEmitter<boolean>();
  triggerMove: boolean = false;
  triggerBack: boolean = false;

  trigger() {
    this.triggerMove = true;
    setTimeout(() => (this.triggerMove = false)); // Reset for next event
    this.completionEvent.emit(this.triggerMove);
  }

  goBack() {
    this.triggerBack = true;
    setTimeout(() => (this.triggerBack = false));
  }

  onStepChanged(step: number) {
    console.log('Moved to step:', step);
  }
}
