import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user.service';

import { messageData, activities, tasks, projectData } from './data';

import { Message, Activity, Tasks, List } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
/**
 * Profile-component - handling profile with sidenav-content
 */
export class ProfileComponent implements OnInit {

  user: User;
  users: User[] = [];

  constructor(private authService: AuthenticationService, private userService: UserProfileService) { }

  ngOnInit() {

    this._fetchData();
    this.getUsers();
  }

  getAdmin() {
    return this.authService.getAdmin()
  }

  getUsers() {
    this.userService.getAll().subscribe((users) => {
      this.users = users
      this.users.map((user) =>
        user.qcm_sessions.sort(function(a, b) {
          if (a.created_date > b.created_date) {
            return -1;
          }
          if (a.created_date < b.created_date) {
            return 1;
          }
          return 0;
        }) )

    })
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.user = this.authService.currentUser();
  }
}
