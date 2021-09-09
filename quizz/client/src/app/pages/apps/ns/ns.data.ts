import { ACTIONS } from "src/app/shared/widgets/table-advanced/table-advanced.model";

const tableSource = {
  title: "Espace De Travail",
  headers: [
    {name: "name",displayName: "Nom"},
    {name: "description",displayName: "Description"},
  ],
  star:{
    show:true,
    icon:"more-vertical"
  },
  footers: [],
  ts:{// ts Table Search Option
    sortColumn: "name",
    sortDirection: 'asc',
    searchTerm: '',
    page: 1,
    pageSize: 5,
    startIndex: 1,
    endIndex: 10,
    totalItems: 0,
    pageSizeList:[1,5,10,25,50,100],
    nsId:0,
    fyId:0,
    option: ''
  },
  show:{
    pagesize:true,
    search:true,
    page:true,
    tableShow:true,
    headers:true
  },
  data:[],
  dataTotal:{},
  actions:ACTIONS,
}

const formDeleteTxt = {
  title:"Supprimer un espace de travail",
  preText:"Saisissez le nom de l'espace de travail : ",
  sufText:"pour supprimer l'espace de travail",
  placeHold:"Enter le mot clé",
}

export { tableSource,formDeleteTxt };
