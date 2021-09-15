import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
/**
 * Profile-component - handling profile with sidenav-content
 */
export class ScoreComponent implements OnInit {

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
