import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { TableAdvanced } from 'src/app/shared/widgets/table-advanced/table-advanced.model';
import { basicBarChart, tableSource } from './chart-budget.data';

@Component({
  selector: 'app-chart-budget',
  templateUrl: './chart-budget.component.html',
  styleUrls: ['./chart-budget.component.scss']
})
export class ChartBudgetComponent implements OnInit {

  @Input()
  chartInput: TableAdvanced

  basicBarChart = basicBarChart;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chartInput': {
            this.setData();
          }
        }
      }
    }
  }

  setData() {
    let soldeprev = 0;
    let solde = 0;
    this.chartInput.data.forEach(item => {
      soldeprev = soldeprev+item.soldeprev 
      solde = solde+item.solde

      this.basicBarChart.series[0].data[0] = soldeprev
      this.basicBarChart.series[1].data[0] = solde
    });
  }

}
