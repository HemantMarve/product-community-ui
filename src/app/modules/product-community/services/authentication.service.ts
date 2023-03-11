import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
  })
export class AuthenticationService{

    constructor(private http: HttpClient) {
    }
    login(email:string, password:string ) {
         
         return this.http.post("http://localhost:8082/user/authenticate", { user: email, password: password });
          
    }

    public setSession(authResult:any) {
        const expiresAt = moment().add(authResult.expiresIn,'second');
        
        localStorage.setItem('id_token', authResult.jwtToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        localStorage.setItem('user', authResult.user);
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {

        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        let expiration = localStorage.getItem("expires_at");
        if(expiration==null)
           expiration='0';
        const expiresAt = JSON.parse(expiration);
          return moment(expiresAt);
    }    
}