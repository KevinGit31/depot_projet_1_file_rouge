import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';

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

  user:User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    this._fetchData();
  }

  getAdmin(){
    return this.authService.getAdmin()
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.user= this.authService.currentUser();
  }
}
