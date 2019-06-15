import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingpageComponent} from './landingpage/landingpage.component';

const routes: Routes = [
  //{path: 'homepage', component: HomepageComponent},
/*   {path: 'homepage', component: HomepageComponent},
  {path: 'register', component: RegisterComponent}, */
  {path: 'home', component: LandingpageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
