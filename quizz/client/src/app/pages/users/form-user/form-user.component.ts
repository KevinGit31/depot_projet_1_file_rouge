import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/auth.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { first, map } from 'rxjs/operators';
import { SelectorContext } from '@angular/compiler';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;
  btn_valid = '';
  title = ''
  update = false;
  user:User 

  constructor(

    private userService: UserProfileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      admin: [false],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.user = new User
    this.setText()
    this.setFormData();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    console.log(this.user)

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.user.email = this.f.email.value
    this.user.name = this.f.name.value
    this.user.admin =this.f.admin.value
    this.user.password = this.f.password.value

    console.log(this.user)

    this.loading = true;
    if (!this.update) {

      this.userService.createUser(this.user)
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

      this.userService.updateUser(this.user)
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

    console.log(this.signupForm.value);
  }

  setText() {
    if (this.router.url === '/user/create') {
      this.title = 'Créer un utilisateur'
      this.btn_valid = 'Créer'
    } else {
      this.title = 'Modifier un utilisateur'
      this.btn_valid = 'Modifier'
      this.update = true;
    }
  }

  setFormData() {

    if (history.state) {

      history.state.item?this.user =history.state.item:1==1; 
      if (this.user) {
        this.signupForm = this.formBuilder.group({
          admin: [this.user.admin],
          name: [this.user.name, Validators.required],
          email: [this.user.email, Validators.required],
          password: [''],
        });
      }
    }

  }

  cancel() {
    this.router.navigate(['/user'])
  }

}
