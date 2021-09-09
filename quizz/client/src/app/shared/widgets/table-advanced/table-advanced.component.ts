import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AdvancedSortableDirective, SortEvent } from './table-advanced-sortable.directive';
import { ActionEmit, TableAdvanced } from './table-advanced.model';
import * as moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr')

@Component({
  selector: 'app-table-advanced',
  templateUrl: './table-advanced.component.html',
  styleUrls: ['./table-advanced.component.scss']
})
export class TableAdvancedComponent implements OnInit {

  @Output()
  actionsEvent = new EventEmitter<ActionEmit>();

  @Output()
  fetchDataEvent = new EventEmitter<ActionEmit>();

  @Input()
  source: TableAdvanced;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;

  constructor() { }

  ngOnInit() {
    if (!this.source) {
      this.source = new TableAdvanced
    }
    if (this.source.data.length == 0) {
      this.fetchDataEvent.emit();
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    this.source.ts.sortColumn = column;
    this.source.ts.sortDirection = direction;
    this._fetchData();
  }

  actionsEventEmit(table, item) {
    let event = new ActionEmit
    event.data = table;
    event.info = item;
    console.log(event)
    this.actionsEvent.emit(event)
  }

  pageSizeChanged() {
    this._fetchData();
    //console.log(this.source.ts.pageSize)
  }

  onPageChange(event) {
    //console.log('Page Changed')
    this.source.ts.page = event;
    this._fetchData();
  }

  searchTerm() {
    //console.log('Search Term')
    this._fetchData();
  }

  /** Traitement de l'affichage des lignes */
  getResult(item1, head) {

    let objet = item1[head.name];
    // Merge de deux champ
    /* if (head.merge) {
       if (item1[head.merge.name1].id == head.merge.id)
         objet = item1[head.merge.name1]
       objet = item1[head.merge.name2]
     }*/
    if (head.subname) {
      return objet[head.subname]
    }
    if (head.dateFormat) {
      return moment(objet).format(head.dateFormat);
    }
    if (head.numberFormat) {
      return objet.toFixed(2);
    }
    return objet
  }

  getColor(item1, head) {
    /*if (head.merge) {
      if (item1[head.merge.debit].id == head.merge.id)
        return 'debit-color'
      return 'credit-color'
    }*/
    let color = ''


    if (head.merge) {
      if (item1[head.merge.debit].id == head.merge.id) {
        color = 'debit-color'
      } else {
        color = 'credit-color'
      }
    } else {
      color = ''
    }

    /** Traitement de couleur numérique 
* - couleur noir valeur zero
* - Couleur bleu valeur supérieur à zéro */
    if (typeof item1[head.name] == 'number' && head.numberFormat) {

      if (item1[head.name] > 0) {
        color = 'debit-color'
      } else if(item1[head.name] < 0){
        color = 'credit-color'
      }else{
        color = ''
      }
    }
    return color;
  }

  getTotalValue(footer) {
    if (footer.displayName)
      return footer.displayName
    return this.source.dataTotal[footer.name]
  }

  _fetchData() {
    this.fetchDataEvent.emit();
  }
}

