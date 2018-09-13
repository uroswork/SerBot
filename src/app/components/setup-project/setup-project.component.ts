import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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
  stepSixText: string = 'Choose a set of questions, or add your own:';
  startStepTwo: boolean = false;
  startStepThree: boolean = false;
  startStepFour: boolean = false;
  startStepFive: boolean = false;
  startStepSix: boolean = false;
  textsToSend: Array<string> = [this.texts[0]];
  disableCTA: boolean = false;
  showCTA: boolean = false;
  showTable: boolean = false;
  showQuestionsTable: boolean = false;
  currentStep: number = 1;
  errorMessage: string = '';
  showError: boolean = false;
  @ViewChild('projectName') projectName: ElementRef;
  @ViewChild('projectType') projectType: ElementRef;
  @ViewChild('projectDescription') projectDescription: ElementRef;
  members: Array<{
    name: string, position: string}> = [
    {
      name: 'Nemanja Nićiforović',
      position: 'Technical Director',
    },
    {
      name: 'Stanko Tadić',
      position: 'Technical Director',
    },
    {
      name: 'Miloš Pavlićević',
      position: 'Lead Developer',
    },
    {
      name: 'Marko Stanković',
      position: 'Senior Developer',
    },
    {
      name: 'Marko Nićiforović',
      position: 'Senior Developer',
    },
    {
      name: 'Marko Šutija',
      position: 'Senior Developer',
    },
    {
      name: 'Marko Marković',
      position: 'Developer',
    },
    {
      name: 'Uroš Tomović',
      position: 'Developer',
    },
    {
      name: 'Srdjan Kuzmanović',
      position: 'Developer',
    },
    {
      name: 'Srdjan Seferović',
      position: 'Developer',
    },
    {
      name: 'Radoš Pavlićević',
      position: 'Developer',
    },
    {
      name: 'Nikola Borisić',
      position: 'Developer',
    },
    {
      name: 'Djordje Ribać',
      position: 'Developer',
    },
    {
      name: 'Vojin Šoškić',
      position: 'Developer',
    },
    {
      name: 'Tijana Jelić',
      position: 'QA',
    },
    {
      name: 'Sara Vukobrat',
      position: 'QA',
    },
    {
      name: 'Katarina Živanović',
      position: 'QA',
    },
    {
      name: 'Relja Jovanović',
      position: 'QA',
    },
    {
      name: 'Tamara Čvorović',
      position: 'QA',
    },
    {
      name: 'Bojan Jevtić',
      position: 'QA',
    },
  ];
  questions: Array<{
    question: string}> = [
    {
      question: 'question1',
    },
    {
      question: 'question2',
    },
    {
      question: 'question3',
    },
    {
      question: 'question4',
    },
    {
      question: 'question5',
    },
    {
      question: 'question6',
    },
    {
      question: 'question7',
    },
    {
      question: 'question8',
    },
    {
      question: 'question9',
    },
  ];

  constructor(private router: Router) { }

  handleClick(event) {
    this.disableCTA = true;
    setTimeout(() => {
      this.disableCTA = false;
    }, 300);
    this.showCTA = false;
    this.currentStep = this.currentStep + 1;
    this.currentStep > 6 && this.router.navigateByUrl('/project');
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
      case 6:
        setTimeout(() => {
          this.startStepSix = true;
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
        this.showCTA = true;
      }, 500);
    } else if (this.currentStep === 6) {
      setTimeout(() => {
        this.showQuestionsTable = true;
        this.showCTA = true;
      }, 500);
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
