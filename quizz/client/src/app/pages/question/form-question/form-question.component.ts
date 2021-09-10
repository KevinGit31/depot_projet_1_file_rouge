import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
  question:Question;

  constructor(

    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.questionForm = this.formBuilder.group({
      text: ['', Validators.required],
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
    this.question.answers = this.f.name.value


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

      this.question = history.state.item
      if (this.question) {
        this.questionForm = this.formBuilder.group({
          text: [this.question.text],
        });
      }
    }

  }

  cancel() {
    this.router.navigate(['/question'])
  }

}
