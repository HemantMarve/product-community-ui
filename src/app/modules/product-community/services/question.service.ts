import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
export class QuestionService{
    getStats() {
      return this.http.get("http://localhost:8082/question/stats");
    }
    getFilteredData(filter: any) {
      return this.http.post("http://localhost:8082/question/getFilteredData",filter);
    }

    searchQuestions(searchOption: string ) {
      console.log(searchOption);
     return this.http.get("http://localhost:8082/question/search/"+searchOption);
    }
    likeComment(commentId: any) {
      return this.http.get("http://localhost:8082/question/like/comment/"+commentId);
    }
    disLikeComment(commentId: any) {
      
      return this.http.get("http://localhost:8082/question/dislike/comment/"+commentId);
    }
    likeQuestion(questionId: number) {
      return this.http.get("http://localhost:8082/question/like/"+questionId);
    }
    disLikeQuestion(questionId: number) {
      return this.http.get("http://localhost:8082/question/dislike/"+questionId);
    }
    closeQuestion(commentId: number, questionId: number) {
      return this.http.get("http://localhost:8082/question/close/"+questionId+"/"+commentId);
    }
    addComment(formData: any,questionId:number) {
      return this.http.post("http://localhost:8082/question/comment/"+questionId,formData);
    }

    constructor(private http: HttpClient) {
    }

    addQuestion(data:any){
        return this.http.post("http://localhost:8082/question/",data);
    }

    getMyQuestion(){
        return this.http.get('http://localhost:8082/question/myQuestion');
    }
    
 
}