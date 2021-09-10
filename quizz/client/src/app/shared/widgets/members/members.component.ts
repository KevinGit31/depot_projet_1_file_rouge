import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  @Input() image: string;
  @Input() name: string;
  @Input() text: string;
  @Input() update: string;
  @Input() delete: string;
  @Input() isAdmin: boolean;
  @Input() userdata:any;
  constructor() { }

  ngOnInit() {
  }

  getColor(){
    if (this.isAdmin) 
        return "success"
    return "primary"
  }

  getValue(){
    if (this.isAdmin) 
        return "Administrateur"
    return "Simple utilisateur"
  }

}
