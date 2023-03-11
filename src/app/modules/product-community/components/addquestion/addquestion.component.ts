import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalHttpHandler } from '../../exception/exception.handler';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductService } from '../../services/product.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})

export class AddquestionComponent implements OnInit {
  userLoggedIn:boolean=false;
  products:any;
  constructor(private productService:ProductService,private authenticationService:AuthenticationService,
    private questionService:QuestionService,private router:Router,private handler:GlobalHttpHandler) { }

  ngOnInit(): void {
    this.userLoggedIn=this.authenticationService.isLoggedIn();
    this.productService.getProducts().pipe(this.handler.httpErrorHandler()).subscribe(
      result=>{
        this.products=result;
      }
    )
  }

  onClickSubmit(data:any){
      let productIndex=data.productType;
      delete data.productType;
      data.productType=this.products[productIndex].productName;
      data.productCode=this.products[productIndex].productID;
      this.questionService.addQuestion(data).pipe(this.handler.httpErrorHandler()).subscribe(
        result=>{
          alert('Question added')
          this.router.navigateByUrl('');
        }
      );


  }

}
