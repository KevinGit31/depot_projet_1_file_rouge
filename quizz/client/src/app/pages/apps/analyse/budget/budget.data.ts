import { ChartType } from "src/app/pages/ui/charts/charts.model";
import { ACTIONS } from "src/app/shared/widgets/table-advanced/table-advanced.model";

const basicColumChart: ChartType = {
  chart: {
      height: 380,
      type: 'bar',
      toolbar: {
          show: false
      }
  },
  plotOptions: {
      bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '25%',
      },
  },
  dataLabels: {
      enabled: false
  },
  stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
  },
  colors: ['#334960', '#f46524'],
  series: [{
      name: 'Solde de départ',
      data: [0]
  }, {
      name: 'Solde Final',
      data: [1]
  }],
  xaxis: {
      categories: [''],
      axisBorder: {
          color: '#d6ddea',
      },
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
  grid: {
      row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
      },
      borderColor: '#f1f3fa'
  },
  tooltip: {
      y: {
          formatter(val) {
              return '€ ' + val + ' euro';
          }
      },
      theme: 'dark',
      x: { show: false }
  }
};

const tableSourceCharge = {
    title: "Dépense",
    headers: [
      {name: "label",displayName: ""},
      {name: "solde",displayName: "Réelles"},
      {name: "soldeprev",displayName: "Prévues"},
      {name: "soldediff",displayName: "Diff"}
    ],
    footers: [],
    star:{
      show:false,
      icon:"more-vertical"
    },
    ts:{// ts Table Search Option
      sortColumn: "dateOperation",
      sortDirection: 'asc',
      searchTerm: '',
      page: 0,
      pageSize: 10,
      startIndex: 1,
      endIndex: 10,
      totalItems: 0,
      pageSizeList:[10,50,100],
      nsId:0,
      fyId:0,
      option: ''
    },
    show:{
      pagesize:false,
      search:false,
      page:false,
      tableShow:false,
      headers:true
    },
    data:[],
    dataTotal:{},
    actions:ACTIONS,
  
    setProperties(data:any){}
  }

const tableSourceProduct = {
    title: "Revenus",
    headers: [
      {name: "label",displayName: "", },
      {name: "solde",displayName: "Réels"},
      {name: "soldeprev",displayName: "Prévu"},
      {name: "soldediff",displayName: "Diff"}
    ],
    footers: [],
    star:{
      show:false,
      icon:"more-vertical"
    },
    ts:{// ts Table Search Option
      sortColumn: "dateOperation",
      sortDirection: 'asc',
      searchTerm: '',
      page: 0,
      pageSize: 10,
      startIndex: 1,
      endIndex: 10,
      totalItems: 0,
      pageSizeList:[10,50,100],
      nsId:0,
      fyId:0,
      option: ''
    },
    show:{
      pagesize:false,
      search:false,
      page:false,
      tableShow:false,
      headers:true
    },
    data:[],
    dataTotal:{},
    actions:ACTIONS,
  
    setProperties(data:any){}
  }

  const basicBarChartProduct: ChartType = {
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
      data: [10]
    }, {
      data: [10]
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

  const basicBarChartCharge: ChartType = {
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
      data: [10]
    }, {
      data: [10]
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

export {  basicColumChart,tableSourceCharge,tableSourceProduct,basicBarChartProduct,basicBarChartCharge};
