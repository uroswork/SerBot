import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../models/userData';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  title: string = 'create an account';
  errorMessage: string = '';
  showError: boolean = false;
  titleAlternative: string = '';
  shouldChangeTitle: boolean = false;
  userData: UserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private router: Router) {}

  checkIfValid(data) {
    switch (data.id) {
      case 'firstName':
        this.userData.firstName = data.value;
        break;
      case 'lastName':
        this.userData.lastName = data.value;
        break;
      case 'email':
        this.userData.email = data.value;
        break;
      case 'password':
        this.userData.password = data.value;
        break;
      case 'confirmPassword':
       this.userData.confirmPassword = data.value;
        break;
    }
  }

  /**
   * Swapping 'create an account' with user's first name, once user submits first name.
   * @param event (inputs length, and event calling this function)
   */
  swapTitle(event) {
    if (event.inputNotEmpty === true) {
      this.titleAlternative = event.value;
      if (!event.changeEvent) {
        this.shouldChangeTitle = true;
      }
    } else {
      this.titleAlternative = this.title;
    }
  }

   /**
   * Responsible for showing error component, and hiding it after 2 seconds.
   * @param message (error message to show)
   */
  handleError(message) {
    this.errorMessage = message;
    this.showError = true;

    setTimeout(() => {
      this.showError = false;
    }, 2000);
  }

   /**
   * Handling click on submit button, checking if account can be created, and calling handleError if needed.
   */
  createAccountClick() {
    event.preventDefault();
    if (this.userData.firstName && this.userData.lastName && this.userData.email && this.userData.password && this.userData.confirmPassword) {
      if (this.userData.password === this.userData.confirmPassword) {
        this.router.navigateByUrl('/setup');
      } else {
        this.handleError('Passwords do not match.');
      }
    } else {
      this.handleError('Please fill all fields.');
    }
  }
}
