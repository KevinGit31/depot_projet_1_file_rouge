import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';

const baseUrl = "http://127.0.0.1:5000/"

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

    getAll() {
        let url=baseUrl+"api/question"
        return this.http.get<Question[]>(url);
    }

    createQuestion(question:Question) {
        let url=baseUrl+"api/question"
        return this.http.post<Question[]>(url,question);
    }

    updateQuestion(question: Question) {
        let url=baseUrl+"api/question/"+question.id
        return this.http.put<Question[]>(url,question);
    }

    deleteQuestion(question: Question) {
        let url=baseUrl+"api/question/"+question.id
        return this.http.delete<Question[]>(url);
    }
}
