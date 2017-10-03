/*
get specific cell -  results.data[row][column]
*/

function isInt(value) {
  return !isNaN(value) && 
    parseInt(Number(value)) == value && 
      !isNaN(parseInt(value, 10));
}

new Vue({
  el: '#options',
  data: {
    charts: [
      "table", "pie", "area", "bar",
      "column", "donut", "geo", "line", "scatter"
    ],
    checkedCharts: ['table','pie','area']
  },
  methods: {
    initChart: function(){

      chart.setCharts(this.checkedCharts)
    },
    fileLoad: function(event){

      Papa.parse(event.path[0].files[0], {
        header:true,
        complete: function(results) {
          
          var headers = results.meta['fields'],
            intColumnPositionArray = []
          
          for(var i = 0; i < headers.length; i++){
            if(isInt(results.data[3][headers[i]]) && results.data[3][headers[0]] !== "Total"){
              intColumnPositionArray.push(i)
            }
          }
          
          chart.setIntColumnPositionArray(intColumnPositionArray);
          
          chart.setHeaders(results.meta['fields'])
          
          chart.setInfo(results.data)
        }
      })
    }
  }
})

$(function(){
  google.charts.load('current', {
    'packages':["table", "corechart", "geochart", "scatter", "controls", "bar"]
  })
});

var chart = new function(){

  var fileData = '',
    headers = [],
    intColPosArr = [],
    loadCharts = function(selectedCharts){

      var data = getData(),
        defaultOptions = {
          height: 250,
          hAxis: {
            title: data.getColumnLabel(0), 
            minValue: data.getColumnRange(0).min, 
            maxValue: data.getColumnRange(0).max
          },
          vAxis: {
            title: data.getColumnLabel(1), 
            minValue: data.getColumnRange(1).min, 
            maxValue: data.getColumnRange(1).max
          }
        },
        containers = document.getElementsByClassName('chartDisplayContainer')

      for( var i = 0; i < containers.length; i++ ){

        var container = containers[i],
          chart = selectedCharts[i]

        console.log(chart, container)

        if( chart == "area" ){

          new google.visualization
            .AreaChart(container)
            .draw(data, defaultOptions)
        }else if(chart == "bar" ){

          new google.charts
            .Bar(container)
            .draw(data, $.extend({}, defaultOptions, {
              bar: {groupWidth: "95%"},
              legend: { position: "none" }
            }))
        }else if( chart == "column" ){

          new google.visualization
            .ColumnChart(container)
            .draw(data, $.extend({}, defaultOptions, {
              bar: {groupWidth: "95%"},
              legend: { position: "none" }
            }))
        }else if( chart == "donut" ){

          new google.visualization
            .PieChart(container)
            .draw(data, $.extend({}, defaultOptions, {pieHole: 0.4}))
        }else if( chart == "geo" ){

          new google.visualization
            .GeoChart(container)
            .draw(data, {})
        }else if( chart == "line" ){

          new google.visualization
            .LineChart(container)
            .draw(data, $.extend({}, defaultOptions, {
              curveType: 'function' ,
              legend: { position: 'bottom'}
            }))
        }else if( chart == "pie" ){

          new google.visualization
            .PieChart(container)
            .draw(data, defaultOptions)
        }else if( chart == "scatter" ){

          new google.visualization
            .ScatterChart(container)
            .draw(data, defaultOptions)
        }else if( chart == "table" ){

          var tableData = new google.visualization.DataTable() //load each row and each header, don't use generic data function
          
          for(var j = 0; j < headers.length; j++){
            tableData.addColumn('string', headers[j] )
          }
          
          for(var infoLineNumber = 0; infoLineNumber < fileData.length; infoLineNumber++){
            
            var rowData = []
              
            for(j=0;j<headers.length; j++){
              rowData.push( fileData[infoLineNumber][headers[j]] )
            }
            
            tableData.addRow(rowData)
          }

          new google.visualization
            .Table(container)
            .draw(tableData, {showRowNumber: false})
        }
      }

      $(".draggable").draggable({snap:true})
    },
    getData = function(){
      
      var data = new google.visualization.DataTable(),
        head = headers[0];
      
      data.addColumn('string', head);
      
      for(var i = 0; i < intColPosArr.length; i++)
        data.addColumn('number', headers[intColPosArr[i]] );
      
      for( var j = 0; j < fileData.length; j++){
        
        var rowData = [ fileData[j][head] ];
          
        for(i=0;i<intColPosArr.length; i++)
          rowData.push( parseInt(fileData[j][headers[intColPosArr[i]]] ) );
        
        try{ data.addRow(rowData); }catch(e){}
        
      }
      
      return data;
    }

  this.setInfo = function(info){ fileData = info }
  this.setHeaders = function(str){ headers = str }
  this.setIntColumnPositionArray = function(arr){ intColPosArr = arr }
  this.setCharts = function(selectedCharts){
    loadCharts(selectedCharts)
  }
}