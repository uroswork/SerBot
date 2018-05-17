import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './components/signup/signup.component';
import { SetUpProjectComponent } from './components/setup-project/setup-project.component';

const routes: Routes = [
  { path: '', redirectTo: '/signUp', pathMatch: 'full' },
  { path: 'signUp', component: SignUpComponent },
  { path: 'setup', component: SetUpProjectComponent }
]
 
@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
