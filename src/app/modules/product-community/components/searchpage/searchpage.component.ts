import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalHttpHandler } from '../../exception/exception.handler';
import { ProductService } from '../../services/product.service';
import { QuestionService } from '../../services/question.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  questions:any=[];
  authors:any;
  products:any;
  filter:any={
    productFilter:"All",
  authorFilter:"All",
  dateFilter:null
  }
  
  constructor(private route:ActivatedRoute,private questionService:QuestionService,private userService:UserService,private productService:ProductService
    ,private handler:GlobalHttpHandler) { }

  ngOnInit(): void {
    let searchOption=this.route.snapshot.paramMap.get('searchoption');
    if(searchOption!=null){
         this.questionService.searchQuestions(searchOption).pipe(this.handler.httpErrorHandler()).subscribe(
           result=>{
                this.questions=result;
                this.questionReady();
        
           }
         );
       }
       this.userService.getUsers().pipe(this.handler.httpErrorHandler()).subscribe(result=>{
        this.authors=result;
      });
      this.productService.getProducts().pipe(this.handler.httpErrorHandler()).subscribe(
        result=>this.products=result
      );
  }

   
  onProductChange(data:string){
      this.filter.productFilter=data;
      this.questionService.getFilteredData(this.filter).pipe(this.handler.httpErrorHandler()).subscribe(
        result=>{
          this.questions=result;
          this.questionReady();
        }
      );
  }
  onAuthorChange(data:string){
    this.filter.authorFilter=data;
    this.questionService.getFilteredData(this.filter).pipe(this.handler.httpErrorHandler()).subscribe(
      result=>{
        this.questions=result;
        this.questionReady();
      }
    );
}

onDateChange(data:string){
  this.filter.dateFilter=data;
  if(data.length==0){
    this.filter.dateFilter==null;
  }
  this.questionService.getFilteredData(this.filter).pipe(this.handler.httpErrorHandler()).subscribe(
    result=>{
      this.questions=result;
      this.questionReady();
    }
  );
}

questionReady(){
  this.questions.forEach(
    (q: any)=>{
         q.showComments=false; 
         q.showReply='Show Comments';
    }
  );
}


}
