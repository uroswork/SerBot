import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { FormValidator } from '../../utils/formValidator';

@Component({
  selector: 'app-select-members-table',
  templateUrl: './select-members-table.component.html',
  styleUrls: ['./select-members-table.component.scss']
})
export class SelectMembersTableComponent {
  @Input() allowTabbing: boolean;
  @Output() handleErrors: EventEmitter<object> = new EventEmitter<object>();
  @ViewChild('searchForAMember') searchForAMember: ElementRef;
  searchForAMemberMobile: string;
  searchVisible: boolean = false;
  showNoResults: boolean = false;
  addNameValid: boolean = false;
  addMailValid: boolean = false;
  addTitleValid: boolean = false;
  @Input() questionStep: boolean;
  @Input() items: Array<{}>;
  showAddNewMember: boolean = false;
  noResultsMessage: string = 'Sorry, I found no one.';
  isSelected: Array<{}> = [];
  isFiltering: boolean = false;
  filteredMembers: Array<{}>;
  firstNamelastNameValue: string;
  emailValue: string;
  titleValue: string;
  questionValue: string;

  constructor(private formValidator: FormValidator) { }


  /**
   * Show or hide search input.
   */
  handleSearchClick() {
    this.searchVisible = !this.searchVisible;
    if (!this.searchVisible) {
      this.searchForAMember.nativeElement.focus();
    }
  }

  handleCloseSearch() {
    this.searchVisible = false;
    this.isFiltering = false;
  }

  /**
   * Responsible for adding member to isSelected array, of selected co-workers
   * @param key (index of each member)
   */
  handleButtonClick(event, key) {
    const fromWhichArrayToPush = this.isFiltering && !this.questionStep ? this.filteredMembers[key] : this.items[key];
    if (this.isSelected.includes(fromWhichArrayToPush)) {
      const index = this.isSelected.indexOf(fromWhichArrayToPush);
      if (index > -1) {
        this.isSelected.splice(index, 1);
      }
    } else {
      this.isSelected.push(fromWhichArrayToPush);
    }
  }

  /**
   * Responsible for filtering members.
   * @param inputValue (input value)
   */
  handleChange(inputValue) {
    const value = inputValue.toLowerCase();
    const isTyping = inputValue.length > 0;
    if (isTyping) {
      this.isFiltering = true;
      const results = this.items.filter(user => user.name.toLowerCase().includes(value));
      const hasResults = results.length > 0;
      this.filteredMembers = results;
      if (hasResults) {
        this.showNoResults = false;
      } else {
        this.showNoResults = true;
      }
    } else {
      this.isFiltering = false;
      this.showNoResults = false;
    }
  }

  handleAddNewClick() {
    this.showAddNewMember = true;
  }

  handleCloseClick() {
    this.showAddNewMember = false;
    // clear input values on exit;
    this.firstNamelastNameValue = '';
    this.emailValue = '';
    this.titleValue = '';
    this.question = '';
  }

  handleOnBlur(event, id) {
    switch (id) {
      case 'firstNameLastName':
        this.addNameValid = this.formValidator.validateName(event.target.value);
        break;
      case 'emailAdd':
        this.addMailValid = this.formValidator.validateMail(event.target.value);
        break;
      case 'titleAdd':
        this.addTitleValid = this.formValidator.validateName(event.target.value);
        break;
      case 'questionAdd':
        this.addQuestionValid = this.formValidator.validateName(event.target.value);
        break;
    }
  }

  handleCtaClick() {
    if (this.addNameValid && this.addMailValid && this.addTitleValid && !this.questionStep) {
      this.items.push({
        name: this.firstNamelastNameValue,
        position: this.titleValue,
      });
      this.showAddNewMember = false;
      // clear input values on exit;
      this.firstNamelastNameValue = '';
      this.emailValue = '';
      this.titleValue = '';
    } else if (this.questionStep && this.addQuestionValid) {
      this.items.push({
        question: this.questionValue,
      });
      this.showAddNewMember = false;
      this.questionValue = '';
    } else {
      this.handleErrors.emit({message: 'Please fill all fields correctly.'});
    }
  }

  finishSetup() {
      this.router.navigateByUrl('/project');
  }
}
