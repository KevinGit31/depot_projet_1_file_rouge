import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/core/models/question';

@Component({
  selector: 'app-question-row',
  templateUrl: './question-row.component.html',
  styleUrls: ['./question-row.component.scss']
})
export class QuestionRowComponent implements OnInit {

  @Input()
  question:Question
  @Output() 
  newQuestionEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  delete(){
    this.newQuestionEvent.emit(this.question);
  }

}
