import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpProjectComponent } from './setup-project.component';

describe('SetUpProjectComponent', () => {
  let component: SetUpProjectComponent;
  let fixture: ComponentFixture<SetUpProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
