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
    reset = function(){

      $("#chartContainer .draggable").remove()
    },
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
        }

      if(selectedCharts.includes("area")){
        new google.visualization
          .AreaChart(createChartContainer())
          .draw(data, defaultOptions)
      }

      if(selectedCharts.includes("bar")){
        new google.charts
          .Bar(createChartContainer())
          .draw(data, $.extend(defaultOptions, {
            bar: {groupWidth: "95%"},
            legend: { position: "none" }
          }))
      }

      if(selectedCharts.includes("column")){
        new google.visualization
          .ColumnChart(createChartContainer())
          .draw(data, $.extend(defaultOptions, {
            bar: {groupWidth: "95%"},
            legend: { position: "none" }
          }))
      }

      if(selectedCharts.includes("donut")){
        new google.visualization
          .PieChart(createChartContainer())
          .draw(data, $.extend(defaultOptions, {pieHole: 0.4}))
      }

      if(selectedCharts.includes("geo")){
        new google.visualization
          .GeoChart(createChartContainer())
          .draw(data, {})
      }

      if(selectedCharts.includes("line")){
        new google.visualization
          .LineChart(createChartContainer())
          .draw(data, $.extend(defaultOptions, {
            curveType: 'function' ,
            legend: { position: 'bottom'}
          }))
      }

      if(selectedCharts.includes("pie")){
        new google.visualization
          .PieChart(createChartContainer())
          .draw(data, defaultOptions)
      }

      if(selectedCharts.includes("scatter")){
        new google.visualization
          .ScatterChart(createChartContainer())
          .draw(data, defaultOptions)
      }

      if(selectedCharts.includes("table")){

        var tableData = new google.visualization.DataTable() //load each row and each header, don't use generic data function
        
        for(var i = 0; i < headers.length; i++){
          tableData.addColumn('string', headers[i] )
        }
        
        for(var infoLineNumber = 0; infoLineNumber < fileData.length; infoLineNumber++){
          
          var rowData = []
            
          for(i=0;i<headers.length; i++){
            rowData.push( fileData[infoLineNumber][headers[i]] )
          }
          
          tableData.addRow(rowData)
        }

        new google.visualization
          .Table(createChartContainer())
          .draw(tableData, {showRowNumber: false})
      }

      $(".draggable").draggable({snap:true})
    },
    createChartContainer = function(){

      var div = $("<div class='draggable'></div>")

      $("#chartContainer").append(div)

      return div[0]
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
    reset()
    loadCharts(selectedCharts)
  }
}