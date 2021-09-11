import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';

const baseUrl = "http://127.0.0.1:5000/"

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
