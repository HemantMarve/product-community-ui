import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalHttpHandler } from '../../exception/exception.handler';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userLoggedIn:boolean=false;
  registerError:string='';
  private alreadyRegisteredUser:any;
  otp:string='';
  registerationData:any;
  isOtpStep:boolean=false;
  constructor(private userService:UserService,private router:Router,private handler:GlobalHttpHandler) { }

  ngOnInit(): void {
    this.registerError='';
    this.userService.getUsers().pipe(this.handler.httpErrorHandler()).subscribe(result=>{
      this.alreadyRegisteredUser=result;
    });
  }

  onClickSubmit(data:any){
    let validated:boolean=true;
     this.alreadyRegisteredUser.forEach((element: any) => {
      if(data.userId.trim().localeCompare(element.userId.trim())==0){
        this.registerError='Email already register';
        validated=false;
        return;
      }  
     });
     if(validated&&data.authenticationKey.localeCompare(data.confirmAuthenticationKey)!=0){
      this.registerError='Password not Match';
      validated=false;  
     }
     if(validated){
       delete data.confirmAuthenticationKey;
       this.registerationData=data;
       this.userService.getOtp(data.userId).pipe(this.handler.httpErrorHandler()).subscribe(
         (result:any)=>this.otp=result.message
       );
       this.isOtpStep=true;
     this.registerError='';
     }
  }

  submitAfterOtpVerification(userOtp:string){
    console.log(userOtp);
    if(this.otp.length!=0&&this.otp.trim().localeCompare(userOtp)==0){
    this.userService.registerUser(this.registerationData).pipe(this.handler.httpErrorHandler()).subscribe(result=>{
      alert("User registered");
      this.isOtpStep=false;
      this.router.navigateByUrl('/login');
    });
    this.registerError="";
  }
  else{
    this.registerError="Invalid Otp";
  }
  }

  backToRegistration(){
    this.isOtpStep=false;
    this.registerError="";
  }
  
}
