import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/core/models/answer';

@Component({
  selector: '<app-answer-row>',
  templateUrl: './answer-row.component.html',
  styleUrls: ['./answer-row.component.scss']
})
export class AnswerRowComponent implements OnInit {

  @Input()
  answer:Answer
  @Output() 
  newAnswerEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  update(){
    let value = {option:"update",answer:this.answer}
    this.newAnswerEvent.emit(value);
  }

  delete(){
    let value = {option:"delete",answer:this.answer}
    this.newAnswerEvent.emit(value);
  }

}
