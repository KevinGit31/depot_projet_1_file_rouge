import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss']
})
export class ViewBudgetComponent implements OnInit {

  month;
  year;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        
        this.month = parseInt(params.month);
        this.year = params.year;
      }
    );
  }

}
