import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingpageComponent} from './landingpage/landingpage.component';

const routes: Routes = [
  { path: 'home', component: LandingpageComponent},
  { path: 'speech', loadChildren: './speech/speech.module#SpeechModule' },
  { path: 'text', loadChildren: './text/text.module#TextModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
