import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/core/models/answer';
import { AnswerService } from 'src/app/core/services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  answers:Answer[]

  constructor(private answerService:AnswerService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.answerService.getAll().subscribe((answers)=>{
        this.answers = answers;
        console.log(this.answers)
    })
  }

}
