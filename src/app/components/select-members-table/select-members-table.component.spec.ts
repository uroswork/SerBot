import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMembersTableComponent } from './select-members-table.component';

describe('SelectMembersTableComponent', () => {
  let component: SelectMembersTableComponent;
  let fixture: ComponentFixture<SelectMembersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMembersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMembersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
