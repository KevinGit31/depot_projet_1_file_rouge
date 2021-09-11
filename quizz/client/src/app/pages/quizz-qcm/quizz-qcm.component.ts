import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Qcm } from 'src/app/core/models/qcm';
import { QcmService } from 'src/app/core/services/qcm.service';

@Component({
  selector: 'app-quizz-qcm',
  templateUrl: './quizz-qcm.component.html',
  styleUrls: ['./quizz-qcm.component.scss']
})
export class QuizzQcmComponent implements OnInit {

  qcms: Qcm[]

  constructor(private qcmService: QcmService, private router: Router) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.qcmService.getAll().subscribe((qcms) => {
      this.qcms = qcms.filter((q) => q.questions.length > 0);
    })
  }

  startQuizz(qcm) {
    this.router.navigate(['/quizz-wizard'], { state: { qcm: qcm } })
  }

}
