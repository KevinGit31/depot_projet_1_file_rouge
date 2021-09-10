import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';

const baseUrl = "http://127.0.0.1:5000/"

@Injectable({ providedIn: 'root' })
export class UserProfileService {

    
    constructor(private http: HttpClient) { }

    getAll() {
        let url=baseUrl+"api/user"
        return this.http.get<User[]>(url);
    }

    createUser(user:User) {
        let url=baseUrl+"api/user"
        return this.http.post<User[]>(url,user);
    }

    updateUser(user: User) {
        let url=baseUrl+"api/user/"+user.id
        return this.http.put<User[]>(url,user);
    }

    deleteUser(user: User) {
        let url=baseUrl+"api/user/"+user.id
        return this.http.delete<User[]>(url);
    }
}