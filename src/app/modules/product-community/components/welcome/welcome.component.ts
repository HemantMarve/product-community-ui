import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalHttpHandler } from '../../exception/exception.handler';
import { AuthenticationService } from '../../services/authentication.service';
import { QuestionService } from '../../services/question.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userLoggedIn:boolean=false;
  searchInput:string='';
  countOfMembers:any=0;
  questionStats:any={
    closed:0,
    total:0
  }
  constructor(private authenticateService:AuthenticationService,private router:Router,private questionService:QuestionService,private userService:UserService,
    private handler:GlobalHttpHandler) { }
  public isMenuCollapsed = true;
  ngOnInit(): void {
      this.userLoggedIn=this.authenticateService.isLoggedIn();
      this.questionService.getStats().pipe(this.handler.httpErrorHandler()).subscribe(
        result=>{
          this.questionStats=result;
        }
      );

      this.userService.getStats().pipe(this.handler.httpErrorHandler()).subscribe(
        result=>{
          this.countOfMembers=result;
        }
      );

  }

  searchQuestions(){
    if(this.searchInput.length!=0){
      this.router.navigateByUrl('searchquestions/'+this.searchInput);
    }
  }

}
