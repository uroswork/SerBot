import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-setup-project',
  templateUrl: './setup-project.component.html',
  styleUrls: ['./setup-project.component.scss']
})
export class SetUpProjectComponent {
  @Input() name: string;
  texts: Array<string> = [
    'Hello!',
    'It is time to set up a new project!',
    'It is very easy and it only takes a minute.',
    'Ready?',
  ]
  stepTwoText: string = 'Okay, first things first, start typing the project name please.';
  stepThreeText: string = 'Cool, what about project type?';
  stepFourText: string = 'Aaaand... project description?';
  stepFiveText: string = 'Who else is working with you?';
  startStepTwo: boolean = false;
  startStepThree: boolean = false;
  startStepFour: boolean = false;
  startStepFive: boolean = false;
  textsToSend: Array<string> = [this.texts[0]];
  disableCTA: boolean = false;
  showCTA: boolean = false;
  showTable: boolean = false;
  currentStep: number = 1;
  errorMessage: string = '';
  showError: boolean = false;
  @ViewChild('projectName') projectName: ElementRef;
  @ViewChild('projectType') projectType: ElementRef;
  @ViewChild('projectDescription') projectDescription: ElementRef;

  constructor() { }

  handleClick(event) {
    this.disableCTA = true;
    setTimeout(() => {
      this.disableCTA = false;
    }, 300);
    this.showCTA = false;
    this.currentStep = this.currentStep + 1;
    switch (this.currentStep) {
      case 2:
        setTimeout(() => {
          this.startStepTwo = true;
        }, 1000);
        break;
      case 3:
        setTimeout(() => {
          this.startStepThree = true;
        }, 1000);
        break;
      case 4:
        setTimeout(() => {
          this.startStepFour = true;
        }, 1000);
        break;
      case 5:
        setTimeout(() => {
          this.startStepFive = true;
        }, 1000);
        break;      
    }
  }

  /**
   * Responsible for showing error component, and hiding it after 2 seconds.
   * @param event.message (error message to show)
   */
  handleErrors(event) {
    this.errorMessage = event.message;
    this.showError = true;

    setTimeout(() => {
      this.showError = false;
    }, 2000);
  }

  checkIfFinished(event) {
    if (this.currentStep === 1) {
      for (let index = 0; index < this.texts.length; index++) {
        if (event.index + 1 === index) {
          this.textsToSend.push(this.texts[index]);
        }
      }
      if (event.index === this.texts.length - 1) {
        this.showCTA = true;
      }
    } else if (this.currentStep === 2) {
      setTimeout(() => {
        this.projectName.nativeElement.focus();
      }, 500);
    } else if (this.currentStep === 3) {
      setTimeout(() => {
        this.projectType.nativeElement.focus();
      }, 500);
    } else if (this.currentStep === 4) {
      setTimeout(() => {
        this.projectDescription.nativeElement.focus();
      }, 500);
    } else if (this.currentStep === 5) {
      setTimeout(() => {
        this.showTable = true;
      }, 500);
    }
  }

  handleCTA(event) {
    if (event.show) {
      this.showCTA = true;
    } else {
      this.showCTA = false;
    }
  }


  handleChange(value, id) {
    const valueLength = value.length;
    if (valueLength > 2) {
      this.showCTA = true;
    } else {
      this.showCTA = false;
    }
  }
}
