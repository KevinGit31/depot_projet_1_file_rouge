import { ACTIONS } from "src/app/shared/widgets/table-advanced/table-advanced.model";

const tableSourceCompte = {
  title: "Les comptes",
  headers: [
    { name: "number", displayName: "Numéro" },
    { name: "label", displayName: "Nom" },
    { name: "labelBilan", displayName: "Label Bilan" },
  ],
  footers: [],
  star: {
    show: true,
    icon: "more-vertical"
  },
  ts: {// ts Table Search Option
    sortColumn: "number",
    sortDirection: 'asc',
    searchTerm: '',
    page: 0,
    pageSize: 10,
    startIndex: 1,
    endIndex: 100,
    totalItems: 0,
    pageSizeList: [10, 100, 1000],
    nsId: 0,
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
  data: [],
  dataTotal:{},
  actions: ACTIONS,
}

const formDeleteTxt = {
  title: "Supprimer un compte",
  preText: "Saisissez le nom du compte : ",
  sufText: "pour supprimer le compte",
  placeHold: "Enter le mot clé",
}

const formInputTxt = [
  {
    action: 'update',
    title: "Modifier un compte",
    okbtn: "Modifier"
  }, {
    action: 'copy',
    title: "Créer un compte",
    okbtn: "Créer"
  }, {
    action: 'create',
    title: "Créer un compte",
    okbtn: "Créer"
  }
]

export { tableSourceCompte, formDeleteTxt, formInputTxt };
