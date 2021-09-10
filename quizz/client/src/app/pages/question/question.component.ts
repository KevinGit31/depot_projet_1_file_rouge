import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions:Question[]

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.questionService.getAll().subscribe((questions)=>{
        this.questions = questions;
        console.log(this.questions)
    })
  }

}
