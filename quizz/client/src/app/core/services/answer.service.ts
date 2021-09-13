import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Answer } from '../models/answer';

const baseUrl = environment.api_url

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

    getAll() {
        let url=baseUrl+"api/answer"
        return this.http.get<Answer[]>(url);
    }

    createAnswer(answer:Answer) {
        let url=baseUrl+"api/answer"
        return this.http.post<Answer[]>(url,answer);
    }

    updateAnswer(answer: Answer) {
        let url=baseUrl+"api/answer/"+answer.id
        return this.http.put<Answer[]>(url,answer);
    }

    deleteAnswer(answer: Answer) {
        let url=baseUrl+"api/answer/"+answer.id
        return this.http.delete<Answer[]>(url);
    }
}
