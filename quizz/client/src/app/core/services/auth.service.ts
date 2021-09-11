import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { CookieService } from './cookie.service';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    token: string;
    user:User;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        if (!this.token) {
            this.token = JSON.parse(this.cookieService.getCookie('token'));
            if (this.token) {
            let jwt:any = jwt_decode(this.token)
            this.user = jwt.user
            }
        }
        return this.user;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        let url1 = "http://127.0.0.1:5000/api/auth/login"

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic ' + btoa(email+':'+password)
            })
          };
          
        return this.http.get<any>(url1,httpOptions)
            .pipe(map(data => {
                console.log(data)
                // login successful if there's a jwt token in the response
                if (data && data.token) {
                    this.token = data.token;

                    let jwt:any = jwt_decode(this.token)
                    this.user = jwt.user
                    // store user details and jwt in cookie
                    this.cookieService.setCookie('token', JSON.stringify(this.token), 1);
                }
                return this.token;
            }));
    }

    getAdmin(){
        if(this.user.admin)
          return "Administrateur"
        return "Simple utilisateur"
    }

    getToken(){
        return this.token;
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('token');
        this.token = null;
        this.user = null;
    }
}

