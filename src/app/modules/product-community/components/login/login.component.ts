import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError } from 'rxjs/operators'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string='';
  constructor(private authenticateService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  onClickSubmit(data:any) {
    this.authenticateService.login(data.user,data.password)
    .pipe(catchError(err=>{
      if(err.status==404){
           this.loginError='Invalid User';
           this.router.navigateByUrl('login');
      }
     return throwError(err);
    }))
    .subscribe(
      (resp)=>{
         this.loginError='';
         this.authenticateService.setSession(resp);
         this.router.navigateByUrl('');
       }
     );
 }
}
