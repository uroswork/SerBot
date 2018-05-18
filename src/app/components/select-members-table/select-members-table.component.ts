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
  showAddNewMember: boolean = false;
  noResultsMessage: string = 'Sorry, I found no one.';
  isSelected: Array<{}> = [];
  isFiltering: boolean = false;
  filteredMembers: Array<{}>;
  firstNamelastNameValue: string;
  emailValue: string;
  titleValue: string;
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
    const fromWhichArrayToPush = this.isFiltering ? this.filteredMembers[key] : this.members[key];
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
      const results = this.members.filter(user => user.name.toLowerCase().includes(value));
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
    }
  }

  handleCtaClick() {
    if (this.addNameValid && this.addMailValid && this.addTitleValid) {
      this.members.push({
        name: this.firstNamelastNameValue,
        position: this.titleValue,
      });
      this.showAddNewMember = false;
      // clear input values on exit;
      this.firstNamelastNameValue = '';
      this.emailValue = '';
      this.titleValue = '';
    } else {
      this.handleErrors.emit({message: 'Please fill all fields correctly.'});
    }
  }
}
