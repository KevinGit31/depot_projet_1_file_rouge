import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';

import { User } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  notificationItems: Notification[];
  user:User;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit() {

    this.user= this.authService.currentUser();
  }

 
  getAdmin(){
    return this.authService.getAdmin()
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

}
