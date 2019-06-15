import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'text/login',
    component: LoginComponent
  },
  {
    path: 'text/register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'text/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TextRoutingModule { }