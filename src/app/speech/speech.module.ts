import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeechRoutingModule } from './speech-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    SpeechRoutingModule
  ]
})
export class SpeechModule { }
