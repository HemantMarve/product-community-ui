import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalHttpHandler } from '../../exception/exception.handler';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() public comments:any; 
  @Input() public questionId:number=0;
  @Input() width:number=0;
  @Input() public questionClosed:boolean=false;
  @Input() public questionUser:any;

  showReply:string='Show Replies';
  showReplies:boolean=false;
  parentIndex:number=0;
  user:any;
  constructor(private questionService:QuestionService,private router:Router,private handler:GlobalHttpHandler) { }

  ngOnInit(): void {
    this.user=localStorage.user;
    this.comments.forEach((comment: any)=>{
          comment.showReplySection=false;
          comment.reply='';
    });
  }

  hideOrUnhide(){
    this.showReplies=!this.showReplies;
    if(this.showReplies){
      this.showReply='Hide Replies'
    }
    else{
      this.showReply='Show Replies'
    }
  }


  showReplySectionOrNot(commentIndex:number){
    console.log(this.comments);
      this.comments[commentIndex].showReplySection=!this.comments[commentIndex].showReplySection;
  }

    replyToComment(commentIndex:number){
        let comment=this.comments[commentIndex];
        let reply={
          subject:comment.subject,
          content:comment.reply,
          parentId:comment.commentId
        }
        this.questionService.addComment(reply,this.questionId).pipe(this.handler.httpErrorHandler()).subscribe(
          result=>{
            comment.reply="";
            comment.childs.push(result);
          }
        );

    }
    questionLockOrUnlock(commentId:number){
          this.questionService.closeQuestion(commentId,this.questionId).pipe(this.handler.httpErrorHandler()).subscribe(
            result=>{
              let currentUrl = this.router.url;
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigate([currentUrl]);
              });
            }
          );
    }

    likedOrDislikedComment(commentIndex:number){
     
        let comment=this.comments[commentIndex];
        if(comment.liked){
          this.questionService.disLikeComment(comment.commentId).pipe(this.handler.httpErrorHandler()).subscribe(
              result=>{
                comment.liked=false;
                comment.likedCount--;
              }
          );
         
        }
        else{
          this.questionService.likeComment(comment.commentId).pipe(this.handler.httpErrorHandler()).subscribe(
            result=>{
              comment.liked=true;
              comment.likedCount++;
            }
          );
         
        }
    }



}
