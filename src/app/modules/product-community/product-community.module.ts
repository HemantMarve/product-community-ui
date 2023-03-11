import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProductCommunityRoutingModule } from './product-community-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddquestionComponent } from './components/addquestion/addquestion.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MyquestionComponent } from './components/myquestion/myquestion.component';
import { CommentComponent } from './components/comment/comment.component';
import { SearchpageComponent } from './components/searchpage/searchpage.component';
@NgModule({
  declarations: [WelcomeComponent, LoginComponent, RegisterComponent, NavbarComponent, AddquestionComponent, MyquestionComponent, CommentComponent, SearchpageComponent],
  imports: [
    CommonModule,
    ProductCommunityRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class ProductCommunityModule { }
