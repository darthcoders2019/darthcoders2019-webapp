import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'speech/login',
        component: LoginComponent
      },
      {
        path: 'speech/register',
        component: RegisterComponent
      },
      {
        path: '',
        redirectTo: 'speech/login',
        pathMatch: 'full'
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpeechRoutingModule { }

