import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Answer } from 'src/app/core/models/answer';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit {

  questionForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  btn_valid = '';
  title = ''
  update = false;
  question: Question;

  answerStr = '';


  constructor(

    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.question = new Question;
    this.questionForm = this.formBuilder.group({
      text: ['', Validators.required],
      answerStr: [''],
    });

    this.setText()
    this.setFormData();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/question';
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.questionForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.questionForm.invalid) {
      return;
    }

    this.question.text = this.f.text.value
    console.log(this.question)
    
    this.loading = true;
    if (!this.update) {

      this.questionService.createQuestion(this.question)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.loading = false;
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
    else {

      console.log(this.question)
      this.questionService.updateQuestion(this.question)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.loading = false;
          },
          error => {
            this.error = error;
            this.loading = false;
          });

    }

    console.log(this.questionForm.value);
  }

  setText() {
    if (this.router.url === '/question/create') {
      this.title = 'Créer une question'
      this.btn_valid = 'Créer'
    } else {
      this.title = 'Modifier une question'
      this.btn_valid = 'Modifier'
      this.update = true;
    }
  }

  setFormData() {

    if (history.state) {
      history.state.item ? this.question = history.state.item : 1 == 1;
      if (this.question) {
        this.questionForm = this.formBuilder.group({
          text: [this.question.text, Validators.required],
          answerStr: [''],
        });
      }
    }

  }

  addAnswer(event) {
    event.preventDefault()
    if (this.f.answerStr.value.trim() != '' && 
    !this.question.answers.find((q)=>q.text==this.f.answerStr.value)) {
      let answer = new Answer
      answer.text = this.f.answerStr.value
      this.f.answerStr.setValue("");

      this.question.answers.push(answer);

    }

  }

  cancel() {
    this.router.navigate(['/question'])
  }

  handleAnswerEvent(event) {
    console.log(event)
    if (event.option == "delete") {
      this.question.answers = this.question.answers.filter((item) => item.text != event.answer.text)
    } else {
      this.f.answerStr.setValue(event.answer.text);
      this.question.answers = this.question.answers.filter((item) => item.text != event.answer.text)
    }
  }

}
