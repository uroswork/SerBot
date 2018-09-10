import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormValidator } from '../../utils/formValidator';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type: string;
  @Input() label: string;
  @Input() inputId: string;

  @Output() checkIfValid: EventEmitter<object> = new EventEmitter<object>();
  @Output() swapTitle: EventEmitter<object> = new EventEmitter<object>();

  shouldTranslate: boolean = false;
  isFocused: boolean = false;
  isValid: boolean = false;
  isTouched: boolean = false;

  constructor(private formValidator: FormValidator) { }

  /**
   * input onChange event
   * responsible for translating input labels if user is typing on them,
   * swapping tittle if input is firstName,
   * and handling validation of inputs (but not changing CSS classes)
   * @param inputValue (value of input)
   * @param id (input id)
   */
  handleChange(inputValue, id) {
    if (inputValue.length > 0) {
      this.shouldTranslate = true;
    } else {
      this.shouldTranslate = false;
    }

    if (id === 'firstName') {
      if (inputValue.length > 0) {
        this.swapTitle.emit({ inputNotEmpty: true, value: inputValue, changeEvent: true });
      } else {
        this.swapTitle.emit({ inputNotEmpty: false, value: inputValue, changeEvent: true });
      }
    }
  }

  /**
   * input focus event
   * used to set css classes for valid/invalid input 
   */
  handleFocus() {
    this.isFocused = true;
  }

  /**
   * input blur event
   * responsible for switching CSS classes based on input validness,
   * @param event (Event)
   * @param id (input id)
   */
  handleBlur(event, id) {
    this.isTouched = true;
    this.isFocused = false;

    if (id === 'firstName') {
      if (event.target.value.length > 0) {
        this.swapTitle.emit({ inputNotEmpty: true, value: event.target.value });
      } else {
        this.swapTitle.emit({ inputNotEmpty: false, value: event.target.value });
      }
    }

    switch (id) {
      case 'firstName':
      case 'lastName':
        this.isValid = this.formValidator.validateName(event.target.value);
        break;
      case 'email':
        this.isValid = this.formValidator.validateMail(event.target.value);
        break;
      case 'password':
      case 'confirmPassword':
        this.isValid = this.formValidator.validatePassword(event.target.value);
        break;
    }

    const data = {
      id: id,
      value: event.target.value,
    }

    this.checkIfValid.emit(data);
  }
}
