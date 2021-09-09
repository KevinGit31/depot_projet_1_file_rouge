import { ChartType } from "src/app/pages/ui/charts/charts.model";
import { ACTIONS } from "src/app/shared/widgets/table-advanced/table-advanced.model";

const tableSource = {
  title: "Le journal",
  headers: [
    { name: "dateOperation", displayName: " - " },
    { name: "dateOperation", displayName: "Prévu" },
    { name: "label", displayName: "Réels" },
    { name: "debit", displayName: "Diff" }
  ],
  footers: [],
  star: {
    show: true,
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
    tableShow: false,
    headers: true
  },
  data: [],
  dataTotal: {},
  actions: ACTIONS,

  setProperties(data: any) { }
}

const basicBarChart: ChartType = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      Width: '5%',
    }
  },
  dataLabels: {
    enabled: false
  }, 
  colors: ['#AEB7C0', '#334960'],
  series: [{
    data: [2]
  }, {
    data: [1]
  }],

  xaxis: {
    // tslint:disable-next-line: max-line-length
    categories: ['Prévues', 'Réelles'],
    axisBorder: {
      color: '#d6ddea',
    },
    axisTicks: {
      color: '#d6ddea',
    }
  },
  legend: {
    offsetY: -10,
},
yaxis: {
    title: {
        text: '€ (euro)'
    }
},
fill: {
    opacity: 1

},
  states: {
    hover: {
      filter: 'none'
    }
  },
  grid: {
    borderColor: '#f1f3fa'
  },
  tooltip: {
    theme: 'dark',
    x: { show: false }
  },
};

export { tableSource, basicBarChart };