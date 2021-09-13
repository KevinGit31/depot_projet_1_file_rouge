import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth.models';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:User[]

  constructor(private userService:UserProfileService) { }

  ngOnInit() {
    this.getAll()
  }


  getAll(){
    this.userService.getAll().subscribe((users)=>{
        this.users = users;
    })
  }

}
