import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './components/signup/signup.component';
import { SetUpProjectComponent } from './components/setup-project/setup-project.component';
import { ProjectOverviewComponent } from './components/project-overview/project-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'setup', component: SetUpProjectComponent },
  { path: 'project', component: ProjectOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
