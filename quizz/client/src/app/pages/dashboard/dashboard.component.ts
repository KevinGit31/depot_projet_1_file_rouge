import { Component, OnInit } from '@angular/core';

import { revenueAreaChart, targetsBarChart, salesDonutChart, ordersData, basicColumChart } from './data';

import { ChartType, OrdersTable } from './dashboard.model';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { Ns } from '../apps/ns/models/ns';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { JournalRowService } from 'src/app/core/services/vdg-service/jr.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { Account } from 'src/app/core/models/account';
import { AccountSolde } from 'src/app/core/models/account_solde';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Dashboard component - handling dashboard with sidear and content
 */
export class DashboardComponent implements OnInit {

  currentFy: Fiscalyear;
  currentNs: Ns;
  accountSoldes: AccountSolde[];

  text="helloe"

  isBudget='False';

  constructor(private nsService: NsService, private jrService: JournalRowService, private fyService: FyService, private compteService: CompteService) { }

  revenueAreaChart: ChartType;
  targetsBarChart: ChartType;
  salesDonutChart: ChartType;
  ordersData: OrdersTable[];

  basicColumChart: ChartType;

  ngOnInit() {
    
    this.currentNs = this.nsService.currentNs();
    this.currentFy = this.fyService.currentFy();
    this.accountSoldes = []
    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * fetches the dashboard value
   */
  private _fetchData() {
    this.revenueAreaChart = revenueAreaChart;
    this.targetsBarChart = targetsBarChart;
    this.salesDonutChart = salesDonutChart;
    this.ordersData = ordersData;

    this.jrService.getAccountSolde(this.currentNs.id, this.currentFy.id)
    .subscribe((accountSoldes) => {
      this.accountSoldes = accountSoldes;
    });

   
  }

}
