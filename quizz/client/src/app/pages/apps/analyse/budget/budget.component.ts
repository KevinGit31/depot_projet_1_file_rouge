import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AccountSolde } from 'src/app/core/models/account_solde';
import { Fiscalyear } from 'src/app/core/models/fiscalyear';
import { CompteService } from 'src/app/core/services/vdg-service/compte.service';
import { FyService } from 'src/app/core/services/vdg-service/fy.service';
import { JournalRowService } from 'src/app/core/services/vdg-service/jr.service';
import { NsService } from 'src/app/core/services/vdg-service/ns.service';
import { revenueAreaChart, targetsBarChart, salesDonutChart, ordersData, basicColumChart } from 'src/app/pages/dashboard/data';
import { ChartType } from 'src/app/pages/ui/charts/charts.model';
import { Ns } from '../../ns/models/ns';
import { basicBarChartCharge, basicBarChartProduct, tableSourceCharge, tableSourceProduct } from './budget.data';
import * as moment from 'moment';
import 'moment/locale/fr'
import { elementClosest } from '@fullcalendar/core/util/dom-manip';
moment.locale('fr')


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  months = [];
  month:any;
  fiscalyears = [];
  year:any;

  basicColumChart: ChartType;

  currentFy: Fiscalyear;
  currentNs: Ns;
  accountSoldes: AccountSolde[];

  basicBarChartCharge = basicBarChartCharge;
  basicBarChartProduct = basicBarChartProduct;

  isBudget = 'False';

  tableSourceCharge= tableSourceCharge;
  tableSourceProduct= tableSourceProduct;

  marge=0;  

  charge=0;
  chargeprev=0;

  product=0;
  productprev=0;

  @Input()
  selectYear;
  @Input()
  selectMonth;

  constructor(private cd: ChangeDetectorRef , private nsService: NsService, private jrService: JournalRowService, private fyService: FyService) { }


  ngOnInit() {
    if(!this.selectYear)
      this.selectYear = moment().year();
    if(!this.selectMonth)
      this.selectMonth = moment().month().valueOf();


    this.currentNs = this.nsService.currentNs();
    this.currentFy = this.fyService.currentFy();
    this.accountSoldes = [];

    let start = moment([this.selectYear, this.selectMonth]).format("DD-MM-yyyy");
    let end = moment([this.selectYear, this.selectMonth.valueOf() + 1]).format("DD-MM-yyyy");

    console.log(start)
    console.log(end )
    /**
     * Fetches the data
     */
    this._fetchData();
    this.getBudget(start,end);
    this.getYears();
    this.getMonths();

  }

  /**
   * fetches the dashboard value
   */
  private _fetchData() {

    this.jrService.getAccountSolde(this.currentNs.id, this.currentFy.id)
      .subscribe((accountSoldes) => {
        this.accountSoldes = accountSoldes;

        let solde = 0

        this.accountSoldes.forEach(item => {
          solde = solde + item.solde
        });

        basicColumChart.series[0].data[0] = solde.toFixed(2);
        basicColumChart.series[0].name = basicColumChart.series[0].name + " " + solde.toFixed(2) + " €";
        this._budget();
      });
  }

  private _budget() {
    this.isBudget = 'True';
    this.basicColumChart = basicColumChart
  }

  getBudget(start,end) {

    this.jrService.getBudgetSolde(this.currentNs.id, this.currentFy.id, start, end)
      .subscribe((data) => {

        this.tableSourceProduct.data = data.revenus.row;
        this.tableSourceCharge.data = data.spend.row;

        this.marge = data.solde;

        this.charge=data.spend.solde;
        this.chargeprev=data.spend.soldeprev;
      
        this.product=data.revenus.solde
        this.productprev=data.revenus.soldeprev
      })
  }

  setDataCharge(data) {
    data.forEach(item => {
      this.chargeprev =  this.chargeprev+item.soldeprev 
      this.charge = this.charge+item.solde
    });
    this.chargeprev = parseFloat(this.chargeprev.toFixed(2)) 
    this.charge = parseFloat(this.charge.toFixed(2)) 
    this.basicBarChartCharge.series[0].data[0]=this.charge;
    this.basicBarChartCharge.series[1].data[0]=this.chargeprev;
    this.basicBarChartCharge.xaxis.categories[0]=this.charge;
    this.basicBarChartCharge.xaxis.categories[1]=this.chargeprev;
  }

  setDataProduct(data){
    data.forEach(item => {
      this.productprev =  this.productprev+item.soldeprev 
      this.product = this.product+item.solde
    });
    this.productprev = parseFloat(this.productprev.toFixed(2)) 
    this.product = parseFloat(this.product.toFixed(2)) 
    this.basicBarChartProduct.series[0].data[0]=this.product;
    this.basicBarChartProduct.series[1].data[0]=this.productprev;
    this.basicBarChartProduct.xaxis.categories[0]=this.product;
    this.basicBarChartProduct.xaxis.categories[1]=this.chargeprev;

  }

  getYears(){
    this.fyService.getAll(this.currentNs.id).subscribe((data) => {
      this.fiscalyears = data;
      this.fiscalyears.forEach(element => {
        if(moment(element.startDate).year() == this.selectYear){
          this.year = element;
        }
      });
    })
  }

  update(){
    let start = moment([moment(this.year.startDate).year(), this.month.id]).format("DD-MM-yyyy");
    let end = ''
    if(this.month.id<11){
      end = moment([moment(this.year.startDate).year(), this.month.id + 1]).format("DD-MM-yyyy");
    }else {
      let start2 = moment([moment(this.year.startDate).year(), this.month.id]).format("-MM-yyyy");
      end =   moment(start).daysInMonth() + start2
    }
    console.log(this.month.id)
    this.getBudget(start,end);
  }

  getMonths(){
    moment.months().forEach((item,index) => {
      let m = {
        name:item.charAt(0).toUpperCase() + item.slice(1),
        id:index
      }
      this.months.push(m);
      
    });

    // Mois de courant
    this.months.forEach(element => {
      if(element.id==this.selectMonth){
        this.month = element;
      }
    });
  }

}
