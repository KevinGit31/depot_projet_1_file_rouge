import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/core/models/auth.models';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.scss']
})
export class FormDeleteComponent implements OnInit {

  delForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  btn_valid = '';
  title = '';
  text = ''
  update = false;
  user:User;

  constructor(

    private userService: UserProfileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.delForm = this.formBuilder.group({
      admin: [false],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.setText()
    this.setFormData();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.delForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    this.loading = true;
    if (!this.update) {

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

  }

  setText() {
    if (this.router.url === '/user/delete') {
      this.title = 'Supprimer un utilisateur'
      this.text = 'Vous allez supprimer cette utilisateur!'
      this.returnUrl= '/user'
    } else {
      this.title = 'Modifier un utilisateur'
      this.update = true;
    }
  }

  setFormData() {
    if (history.state) {
      this.user = history.state.item
    }
  }

  cancel() {
    this.router.navigate(['/user'])
  }

}
