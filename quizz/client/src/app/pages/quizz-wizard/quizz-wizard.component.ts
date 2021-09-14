import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/core/models/answer';
import { Qcm } from 'src/app/core/models/qcm';
import { Question } from 'src/app/core/models/question';
import { CookieService } from 'src/app/core/services/cookie.service';
import { QcmSessionService } from 'src/app/core/services/qcm-session.service';

@Component({
  selector: 'app-quizz-wizard',
  templateUrl: './quizz-wizard.component.html',
  styleUrls: ['./quizz-wizard.component.scss']
})
export class QuizzWizardComponent implements OnInit {

  qcm: Qcm;
  qcm_session: any;
  question: Question;
  index = 0;
  showScore: boolean;
  questions: Question[] = [];
  score=0;

  constructor(
    private qcmSessionService:QcmSessionService,
    private cookieService: CookieService, private router: Router) { }

  ngOnInit() {

    if (history.state) {
      this.qcm = history.state.qcm
      if (!this.qcm) {
        this.qcm = JSON.parse(this.cookieService.getCookie('qcm'));
        if (!this.qcm) {
          this.home()
        }
      }
    }
    console.log(this.qcm)
    this.cookieService.setCookie('qcm', JSON.stringify(this.qcm), 1);
    this.questions.push(this.getQuestion(this.qcm.questions[this.index]));
    this.qcm_session = { qcm_id: this.qcm.id, questions: [] }
  }

  prev() {
    if (this.index > 0) {
      this.index = this.index - 1
    }
  }

  next() {


    this.qcm_session.questions = []
    this.questions.forEach(question => {
      let q = { question_id: question.id, answers: [] }
      q.answers = []
      question.answers.forEach(answer => {
        let a = { answer_id: answer.id, isTrue: answer.isTrue }
        q.answers.push(a)
      });
      this.qcm_session.questions.push(q)
    });

    console.log(this.qcm_session)
    this.index = this.index + 1
    if (this.index < this.qcm.questions.length) {
      
      if (!this.questions[this.index])
        this.questions.push(this.getQuestion(this.qcm.questions[this.index]));
    } else {
      this.showScore = true;
      this.cookieService.deleteCookie('qcm')
      this.qcmSessionService.createQcmSession(this.qcm_session).subscribe((data)=>{
        this.score = data.score
      });

      console.log(this.questions)
      console.log(this.showScore)
    }
  }

  home() {
    this.router.navigate(['/'])
  }

  getScore() {
    let qcm = { "qcm_id": this.qcm.id }
  }

  handlechange(answer_id){
    this.questions[this.index].answers.map((a)=>a.isTrue=false);
    this.questions[this.index].answers.map((a)=>{if(a.id==answer_id) {a.isTrue=true} return a});
    console.log(this.questions[this.index])
  }

  getQuestion(q) {
    let question: Question = new Question;

    question.id = q.id
    question.text = q.text
    question.answers = []
    q.answers.forEach(answer => {
      let _answer = new Answer
      _answer.id = answer.id
      _answer.text = answer.text
      question.answers.push(_answer)
    });
    return question;
  }

}
