import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalHttpHandler } from '../../exception/exception.handler';
import { AuthenticationService } from '../../services/authentication.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-myquestion',
  templateUrl: './myquestion.component.html',
  styleUrls: ['./myquestion.component.css']
})
export class MyquestionComponent implements OnInit {
   userLoggedIn:boolean=false;
   @Input() questions:any;
   user:any;
   isMyQuestion:boolean=false;
   comments:any;
   width:number=45;
   commentQuestionId:number=0;
   commentQuestionIndex:number=0;
   parentId:number=0;
   @ViewChild('closeButton')
   buttonToBeClicked!: ElementRef;
  constructor(private questionService:QuestionService,private authenticationService:AuthenticationService,private router:Router,
    private handler:GlobalHttpHandler) { }
  
  ngOnInit(): void {
    let currentUrl = this.router.url;
    
    this.userLoggedIn=this.authenticationService.isLoggedIn();
    this.user=localStorage.user;
    if(currentUrl.localeCompare("/myquestions")==0){
      this.isMyQuestion=true;
   this.questionService.getMyQuestion().pipe(this.handler.httpErrorHandler()).subscribe(
     
      result=>{
        this.questions=result;
        this.questions.forEach(
          (q: any)=>{
               q.showComments=false; 
               q.showReply='Show Comments';
          }
        );
      }
    );
 
    }
  }

  hideOrUnhide(index:any){
    let question=this.questions[index];
    question.showComments=!question.showComments;
    if(question.showComments){
      question.showReply='Hide Comments'
    }
    else{
      question.showReply='Show Comments'
    }
  }

  updateCommentSection(questionId:number,questionIndex:number){
     this.commentQuestionId=questionId;
     this.commentQuestionIndex=questionIndex;
  }

  addComment(data:NgForm){
          let formData=data.value;
          this.questionService.addComment(formData,this.commentQuestionId).pipe(this.handler.httpErrorHandler()).subscribe(
            result=>{
            //  let currentUrl = this.router.url;
            this.questions[this.commentQuestionIndex].comments.push(result);
            data.reset();
            this.buttonToBeClicked.nativeElement.click();
            }
          );
          data.resetForm();
         // this.router.navigateByUrl("/myquestions");
  }

  unlockQuestion(questionIndex:number){
    let question=this.questions[questionIndex];
    this.questionService.closeQuestion(0,question.questionId).pipe(this.handler.httpErrorHandler()).subscribe(
      result=>{
        question.questionClosed=0;
      }
    )
  }

  likedOrDislikedQuestion(questionIndex:number){
    let question=this.questions[questionIndex];
    if(question.liked){
      this.questionService.disLikeQuestion(question.questionId).pipe(this.handler.httpErrorHandler()).subscribe(
        result=>{
          question.liked=false;
          question.likedCount--;
        }
      );
    
    }
    else{
      this.questionService.likeQuestion(question.questionId).pipe(this.handler.httpErrorHandler()).subscribe(
        result=>{
          question.liked=true;
          question.likedCount++;
        }
      );
     
    }

  }


}
