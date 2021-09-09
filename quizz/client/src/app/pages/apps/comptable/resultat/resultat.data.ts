import { ACTIONS } from "src/app/shared/widgets/table-advanced/table-advanced.model";

const tableSourceProduit = {
  title: "Les comptes produits",
  headers: [
    {name: "account",displayName: "Numéro", subname:'number'},
    {name: "account",displayName: "Nom", subname:'label'},
    { name: "solde", displayName: "Montant" , numberFormat: "D"},
  ],
  footers: [],
  star: {
    show: false,
    icon: "more-vertical"
  },
  ts: {// ts Table Search Option
    sortColumn: "dateOperation",
    sortDirection: 'asc',
    searchTerm: '',
    page: 0,
    pageSize: 10,
    startIndex: 1,
    endIndex: 10,
    totalItems: 0,
    pageSizeList: [10, 50, 100],
    nsId: 0,
    fyId: 0,
    option: ''
  },
  show: {
    pagesize: false,
    search: false,
    page: false,
    tableShow: true,
    headers: false,
    footerTotal: false
  },
  data: [],
  dataTotal:{},
  actions: ACTIONS,

  setProperties(data: any) { }
}

const tableSourceCharge = {
  title: "Les comptes de charges",
  headers: [
    {name: "account",displayName: "Numéro", subname:'number'},
    {name: "account",displayName: "Nom", subname:'label'},
    { name: "solde", displayName: "Montant" , numberFormat: "D"},
  ],
  footers: [],
  star: {
    show: false,
    icon: "more-vertical"
  },
  ts: {// ts Table Search Option
    sortColumn: "dateOperation",
    sortDirection: 'asc',
    searchTerm: '',
    page: 0,
    pageSize: 10,
    startIndex: 1,
    endIndex: 10,
    totalItems: 0,
    pageSizeList: [10, 50, 100],
    nsId: 0,
    fyId: 0,
    option: ''
  },
  show: {
    pagesize: false,
    search: false,
    page: false,
    tableShow: true,
    headers: false,
    footerTotal: false
  },
  data: [],
  dataTotal:{},
  actions: ACTIONS,

  setProperties(data: any) { }
}

const formDeleteTxt = {
  title: "Supprimer une écriture comptable",
  preText: "Saisissez le nom de l'écriture comptable : ",
  sufText: "pour supprimer l'écriture comptable",
  placeHold: "Enter le mot clé",
}

const formInputTxt = [
  {
    action: 'update',
    title: "Modifier une écriture comptable",
    okbtn: "Modifier"
  }, {
    action: 'copy',
    title: "Créer une écriture comptable",
    okbtn: "Créer"
  }, {
    action: 'create',
    title: "Créer une écriture comptable",
    okbtn: "Créer"
  }
]

function u() {
  console.log("u")
}

export { tableSourceProduit,tableSourceCharge, formDeleteTxt, formInputTxt };
