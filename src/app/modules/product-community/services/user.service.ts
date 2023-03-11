import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
export class UserService{
    getStats() {
        return this.http.get("http://localhost:8082/user/stats");
    }

    constructor(private http: HttpClient) {
    }

    registerUser(data:any){
        return this.http.post("http://localhost:8082/user/register",data);
    }

    getUsers(){
        return this.http.get("http://localhost:8082/user/");
    }

    getOtp(userId:string){
        return this.http.get("http://localhost:8082/user/generateOtp/"+userId);
    }
 
}