import { NgModule } from '@angular/core';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginActivate } from './guards/login.active.guard';
import { RegisterComponent } from './components/register/register.component';
import { AddquestionComponent } from './components/addquestion/addquestion.component';
import { MyquestionComponent } from './components/myquestion/myquestion.component';
import { SearchpageComponent } from './components/searchpage/searchpage.component';


const routes: Routes = [
  //canActivate:[LoginActivate]
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addquestion', component:AddquestionComponent  ,canActivate:[LoginActivate]},
  { path: 'myquestions', component:MyquestionComponent  ,canActivate:[LoginActivate]},
  { path: 'searchquestions/:searchoption', component:SearchpageComponent  ,canActivate:[LoginActivate]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCommunityRoutingModule { }
