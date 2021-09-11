import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Answer } from 'src/app/core/models/answer';
import { Qcm } from 'src/app/core/models/qcm';
import { Question } from 'src/app/core/models/question';
import { QcmService } from 'src/app/core/services/qcm.service';
import { QuestionService } from 'src/app/core/services/question.service';


@Component({
  selector: 'app-form-qcm',
  templateUrl: './form-qcm.component.html',
  styleUrls: ['./form-qcm.component.scss']
})
export class FormQcmComponent implements OnInit {
  qcmForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  btn_valid = '';
  title = ''
  update = false;
  qcm: Qcm;

  answerStr = '';
  questions:Question[];
  selectQuestion:Question;


  constructor(

    private questionService: QuestionService,
    private qcmService: QcmService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.qcm = new Qcm;
    this.qcmForm = this.formBuilder.group({
      sujet: ['', Validators.required],
      description: [''],
    });

    this.setText()
    this.setFormData();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/qcm';
    this.getQuestions();
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.qcmForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.qcmForm.invalid) {
      return;
    }

    this.qcm.sujet = this.f.sujet.value
    this.qcm.description = this.f.description.value
    
    this.loading = true;
    if (!this.update) {

      this.qcmService.createQcm(this.qcm)
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

      console.log(this.qcm)
      this.qcmService.updateQcm(this.qcm)
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

    console.log(this.qcmForm.value);
  }

  setText() {
    if (this.router.url === '/qcm/create') {
      this.title = 'Créer un QCM'
      this.btn_valid = 'Créer'
    } else {
      this.title = 'Modifier un QCM'
      this.btn_valid = 'Modifier'
      this.update = true;
    }
  }

  setFormData() {
    console.log(history.state.item)

    if (history.state) {
      history.state.item ? this.qcm = history.state.item : 1 == 1;
      if (this.qcm) {
        this.qcmForm = this.formBuilder.group({
          sujet: [this.qcm.sujet, Validators.required],
          description: [this.qcm.description],
        });
      }
    }

  }

  handleQuestion(event){
    this.selectQuestion = event;
    console.log(event)
  }

  addQuestion(event){
    event.preventDefault()
    if(!this.qcm.questions.find((q)=>q.id==this.selectQuestion.id) && this.selectQuestion.id){
      this.qcm.questions.push(this.selectQuestion);
    }    
  }

  cancel() {
    this.router.navigate(['/qcm'])
  }

  getQuestions(){
    this.questionService.getAll().subscribe((data)=>{
      this.questions = data;
    })
  }

  handleQuestionsEvent(event) {
    this.qcm.questions = this.qcm.questions.filter((item) => item.id != event.id)
  }
}
