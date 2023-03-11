import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  OperatorFunction, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
  })
export class GlobalHttpHandler{
   //Below all are error handlers
   getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }
    }
}
httpErrorHandler():OperatorFunction<any,any>{
    return catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg=error.error.message;
        } else {
          errorMsg=this.getServerErrorMessage(error);
        }
        alert(errorMsg);
        return throwError(errorMsg);
    })
}
}