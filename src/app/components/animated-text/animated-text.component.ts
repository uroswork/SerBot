import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss']
})
export class AnimatedTextComponent implements OnInit, OnChanges {
  @Input() text: string;
  @Input() index: number;
  @Input() shouldStart: boolean;
  @Input() currentStep: number;
  animatedText: string;
  stopAnimation: boolean = false;
  @Output()
  checkIfFinished: EventEmitter<object> = new EventEmitter<object>();
  constructor() { }

  ngOnInit() {
     if (this.currentStep === 1 && this.shouldStart) {
      this.handleAnimation();
     }
  }

  ngOnChanges() {
    if (this.currentStep !== 1 && this.shouldStart) {
      this.handleAnimation();
    }
  }

  handleAnimation() {
    if (!this.stopAnimation) {
      const text = this.text;
      const length = text.length;
      let character = 0;
      const interval = setInterval(() => {
        character++;
        this.animatedText = text.substring(0, character);
        if (character === length) {
          this.stopAnimation = true;
          this.checkIfFinished.emit({index: this.index, finished: true});
          clearInterval(interval);
        }
      }, 25);
    }
  }
}
