import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'completion-bar',
  template: `<div class="completion-bar">
    <div
      *ngFor="let seg of [].constructor(segments); let i = index"
      class="segment"
      [class.active]="i === currentStep"
    ></div>
  </div>`,
  styles: `.completion-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  height: 13px;
  display: flex;
}

.segment {
  flex: 1;
  background-color: #ccc;
  transition: background-color 0.3s ease;
}

.segment.active {
  background-color: #4caf50;
}`,
  standalone: true,
})
export class CompletionBarComponent implements OnChanges {
  @Input() segments: number = 1;
  @Input() completionEvent: boolean = false;
  @Input() goBackEvent: boolean = false;
  @Output() stepChanged = new EventEmitter<number>();

  currentStep = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['completionEvent'] && changes['completionEvent'].currentValue) {
      this.moveNext();
    }
		if (changes['goBackEvent'] && changes['goBackEvent'].currentValue) {
      this.moveBack();
    }
  }

  moveNext() {
    if (this.currentStep < this.segments - 1) {
      this.currentStep++;
    }
  }

	moveBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepChanged.emit(this.currentStep);
    }
  }
}
