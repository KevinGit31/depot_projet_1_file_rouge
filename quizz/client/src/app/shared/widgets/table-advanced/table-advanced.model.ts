import { SortDirection } from "src/app/pages/ui/tables/advanced/advanced-sortable.directive";

export class TableAdvanced {

    title:string;
    headers: TableAdvancedHeaders[];
    footers: any[];
    star: TableAdvancedStar;  
    ts:TableState;
    show:ShowOption
    data:any[];
    dataTotal:any;
    actions:any;
  
    constructor(){
      this.title="Titre";
      this.headers=[];
      this.star = new TableAdvancedStar;
      this.data = [];
      this.actions=ACTIONS;
      this.show= new ShowOption
    }

    setProperties(data:any){
      this.title=data.title;
      this.headers=data.headers;
      this.star = data.star;
      this.data = data.data;
      this.actions=ACTIONS;
      this.show= data.show;
      this.ts=data.ts
    }
}

export class ShowOption{
  pagesize:boolean;
  search:boolean;
  page:boolean;
  tableShow:boolean;
}

export class TableAdvancedHeaders {

  name:string;
  displayName:string;
  subname?:string;
  dateFormat?:string;

}
export class TableAdvancedStar {
  show:boolean;
  icon:string;
}

export class Action {
  text:string;
  icon:string;
  action:string;
}

export class ActionEmit {
  info:Action;
  data:any;
}

export interface TableState {
  sortColumn: string,
  sortDirection: string,
  searchTerm: string;
  page: number,
  pageSize: number,
  startIndex: number;
  endIndex: number;
  totalItems: number;
  nsId:number;
  fyId:number;
  option:any;
}


const ACTIONS = [
  {text:"Modifier",icon:"edit-3",action:"update"},
  {text:"Copier",icon:"copy",action:"copy"},
  {text:"Supprimer",icon:"trash-2",action:"delete"}
]

export { ACTIONS};

