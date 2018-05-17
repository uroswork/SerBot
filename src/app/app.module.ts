import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';

import { FormValidator } from './utils/formValidator';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { SignUpComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { SetUpProjectComponent } from './components/setup-project/setup-project.component';
import { AnimatedTextComponent } from './components/animated-text/animated-text.component';
import { SelectMembersTableComponent } from './components/select-members-table/select-members-table.component';
import { ProjectOverviewComponent } from './components/project-overview/project-overview.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ErrorHandlerComponent,
    SignUpComponent,
    SetUpProjectComponent,
    AnimatedTextComponent,
    SelectMembersTableComponent,
    ProjectOverviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    FormValidator,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
