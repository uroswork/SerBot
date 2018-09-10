import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormValidator } from '../../utils/formValidator';
import { UserData } from '../../models/userData';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent {
  errorMessage: string;
  title: string = 'create an account!';
  titleAlternative: string;
  shouldChangeTitle: boolean;
  showError: boolean;
  userData: UserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private router: Router, private formValidator: FormValidator) { }

  /**
   * Called inside input component - onBlur method 
   * There it validates it & checks if the input is value matches input type
   * Here we just set it to userData object
   */
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
    if (event.inputNotEmpty) {
      this.titleAlternative = `${event.value.trim()}!`;
      if (!event.changeEvent) {
        this.shouldChangeTitle = true;
      }
    } else {
      this.titleAlternative = this.title;
    }
  }

  /**
  * Responsible for showing error component, and hiding it after 3 seconds.
  * @param message (error message to show)
  */
  handleError(message) {
    this.errorMessage = message;
    this.showError = true;

    setTimeout(() => {
      this.showError = false;
    }, 3000);
  }

  /**
  * Handles click on submit button.
  * Checks if user data is correct & account can be created
  * Calls handleError if needed.
  */
  createAccountClick() {
    if (this.userData.firstName && this.userData.lastName && this.userData.email && this.userData.password && this.userData.confirmPassword) {
      if (this.formValidator.validateMail(this.userData.email)) {
        if (this.formValidator.validatePassword(this.userData.password) && this.formValidator.validatePassword(this.userData.confirmPassword)) {
          if (this.userData.password === this.userData.confirmPassword) {
            this.router.navigateByUrl('/setup');
          } else {
            this.handleError('Passwords do not match.');
          }
        } else {
          this.handleError('Password needs to be at least 8 characters long.');
        }
      } else {
        this.handleError('Please enter a valid email.');
      }
    } else {
      this.handleError('All fields are required.');
    }
  }
}
