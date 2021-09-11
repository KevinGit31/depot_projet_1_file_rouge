import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/core/models/auth.models';
import { Qcm } from 'src/app/core/models/qcm';
import { Question } from 'src/app/core/models/question';
import { QcmService } from 'src/app/core/services/qcm.service';
import { QuestionService } from 'src/app/core/services/question.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.scss']
})
export class FormDeleteComponent implements OnInit {


  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  btn_valid = '';
  title = '';
  text = ''
  update = false;
  user: User;
  qcm:Qcm;
  question: Question;

  constructor(
    private qcmService: QcmService,
    private userService: UserProfileService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
    this.setText()
    this.setFormData();

  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }


  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    this.loading = true;

    switch(this.router.url){
        case '/user/delete':
           this.deleteUser()
           break;
        case '/question/delete':
          this.deleteQuestion()
          break;
        case '/qcm/delete':
            this.deleteQcm()
            break;
    }
}

  setText() {
    if (this.router.url === '/user/delete') {
      this.title = 'Supprimer un utilisateur'
      this.text = 'Vous allez supprimer cet utilisateur!'
      this.returnUrl = '/user'
    }

    if (this.router.url === '/question/delete') {
      this.title = 'Supprimer une question'
      this.text = 'Vous allez supprimer cette question!'
      this.returnUrl = '/question'
    }

    if (this.router.url === '/qcm/delete') {
      this.title = 'Supprimer un QCM'
      this.text = 'Vous allez supprimer ce QCM!'
      this.returnUrl = '/qcm'
    }

  }

  setFormData() {
    if (history.state) {
      this.user = history.state.item
      this.question = history.state.item
      this.qcm = history.state.item
    }
    console.log(this.qcm)
  }

  cancel() {
    this.router.navigate([this.returnUrl])
  }

  deleteUser(){
    this.userService.deleteUser(this.user)
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

  deleteQcm(){
    this.qcmService.deleteQcm(this.qcm)
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

  deleteQuestion(){
      this.questionService.deleteQuestion(this.question)
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

}
