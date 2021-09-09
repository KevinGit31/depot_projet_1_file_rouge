import { ACTIONS } from "src/app/shared/widgets/table-advanced/table-advanced.model";

const tableSource = {
  title: "Espace De Travail",
  headers: [
    {name: "name",displayName: "Nom"},
    {name: "startDate",displayName: "Date de début"},
    {name: "endDate",displayName: "Date de fin"},
  ],
  footers: [],
  star:{
    show:true,
    icon:"more-vertical"
  },
  ts:{// ts Table Search Option
    sortColumn: "name",
    sortDirection: 'asc',
    searchTerm: '',
    page: 0,
    pageSize: 5,
    startIndex: 1,
    endIndex: 10,
    totalItems: 0,
    pageSizeList:[5,10,50,100],
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
  title:"Supprimer un exercice fiscal",
  preText:"Saisissez le nom de l'exercice fiscal : ",
  sufText:"pour supprimer l'exercice fiscal",
  placeHold:"Enter le mot clé",
}

const formInputTxt = [
  {
    action: 'update',
    title: "Modifier un exercice fical",
    okbtn: "Modifier"
  }, {
    action: 'copy',
    title: "Créer un exercice fical",
    okbtn: "Créer"
  }, {
    action: 'create',
    title: "Créer un exercice fical",
    okbtn: "Créer"
  }
]


export { tableSource,formDeleteTxt,formInputTxt };
