import { Component, OnInit } from '@angular/core';
import { Qcm } from 'src/app/core/models/qcm';
import { QcmService } from 'src/app/core/services/qcm.service';

@Component({
  selector: 'app-quizz-qcm',
  templateUrl: './quizz-qcm.component.html',
  styleUrls: ['./quizz-qcm.component.scss']
})
export class QuizzQcmComponent implements OnInit {

  qcms:Qcm[]

  constructor(private qcmService:QcmService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this.qcmService.getAll().subscribe((qcms)=>{
        this.qcms = qcms;
    })
  }

}
