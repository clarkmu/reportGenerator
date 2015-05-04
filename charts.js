/*


ints only - headers and each line of data, no totals
scatter
line
bar

only two columns, each int


needs totals line
table, donut, pie


*/



var theInformatics = '', fileCSV = '',

    showArea = false, showBar = false, showColumn = false, showDonut = false, showGeo = false, 
    showLine = false, showPie = false, showTable = false, showScatter = false,
    
    headers = [],
    
    firstRun = true,
    
    intColPosArr = [],
    
    totalLine = [],
    
    toType = function(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    
    ;

function initialize(){
  
  reset();
  
  if(firstRun){
    firstRun = false;
    google.load("visualization", "1.1", {packages:["table", "corechart", "geochart", "scatter", "controls", "bar"], 'callback': loadCharts });
  }else
    loadCharts();
  
}

function reset(){

    document.getElementById('first_div').hidden = true;
    document.getElementById('second_div').hidden = true;
    document.getElementById('third_div').hidden = true;
    document.getElementById('fourth_div').hidden = true;
    document.getElementById('fifth_div').hidden = true;
    document.getElementById('sixth_div').hidden = true;
    document.getElementById('seventh_div').hidden = true;
    document.getElementById('eigth_div').hidden = true;

}

function loadCharts(){

    if(showArea)
      try{
        loadArea();
      }catch(e){alert("Failed to load Area.");}

    if(showBar)
      try{
        loadBar();
      }catch(e){alert("Failed to load Bar.");}

    if(showColumn)
      try{
        loadColumn();
      }catch(e){alert("Failed to load Column.");}

    if(showDonut)
      try{
        loadDonut();
      }catch(e){alert("Failed to load Donut.");}

    if(showGeo)
      try{
        loadGeo();
      }catch(e){alert("Failed to load Table.");}

    if(showLine)
      try{
        loadLine();
      }catch(e){alert("Failed to load Line.");}

    if(showPie)
      try{
        loadPie();
      }catch(e){alert("Failed to load Pie.");}

    if(showScatter)
      try{
          loadScatter();
      }catch(e){alert("Failed to load Scatter.");}

    if(showTable)
      try{
        loadTable();
      }catch(e){alert("Failed to load Table.");}

/*
  if(showArea)
    loadArea();

  if(showBar)
    loadBar();

  if(showColumn)
    loadColumn();

  if(showDonut)
    loadDonut();

  if(showGeo)
    loadGeo();

  if(showLine)
    loadLine();

  if(showPie)
    loadPie();

  if(showScatter)
    loadScatter();

  if(showTable)
    loadTable();
    */
}

function unloadChart(chart){}

function firstAvailableDiv(){  //place the chart wherever

    if( document.getElementById('first_div').hidden ){
        document.getElementById('first_div').hidden = false;
        return "first_div";
    }

    if( document.getElementById('second_div').hidden ) {
        document.getElementById('second_div').hidden = false;
        return "second_div";
    }

    if( document.getElementById('third_div').hidden ) {
        document.getElementById('third_div').hidden = false;
        return "third_div";
    }

    if( document.getElementById('fourth_div').hidden ) {
        document.getElementById('fourth_div').hidden = false;
        return "fourth_div";
    }
    
    if( document.getElementById('fifth_div').hidden ){
        document.getElementById('fifth_div').hidden = false;
        return "fifth_div";
    }

    if( document.getElementById('sixth_div').hidden ) {
        document.getElementById('sixth_div').hidden = false;
        return "sixth_div";
    }

    if( document.getElementById('seventh_div').hidden ) {
        document.getElementById('seventh_div').hidden = false;
        return "seventh_div";
    }

    if( document.getElementById('eigth_div').hidden ) {
        document.getElementById('eigth_div').hidden = false;
        return "eigth_div";
    }
    
    if( document.getElementById('ninth_div').hidden ) {
        document.getElementById('ninth_div').hidden = false;
        return "eigth_div";
    }

}




//  GETTERS/SETTERS



function setInfo(info){
    theInformatics = info;
    initialize();
}
function setArea(bool){ showArea = bool; }
function setBar(bool){ showBar = bool; }
function setColumn(bool){ showColumn = bool; }
function setDonut(bool){ showDonut = bool; }
function setGeo(bool){ showGeo = bool; }
function setLine(bool){ showLine = bool; }
function setPie(bool){ showPie = bool; }
function setTable(bool){ showTable = bool; }
function setScatter(bool){ showScatter = bool; }

function setHeaders(str){ headers = str; }
function setIntColumnPositionArray(arr){ intColPosArr = arr; }
function setTotalLine(arr){ totalLine = arr; }



//       CHART LOAD FUNCTIONS



function loadArea() {

  var data = getData();

    var options = {
      height: 250,
      hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
      vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max },
    };

    var chart = new google.visualization.AreaChart(document.getElementById(firstAvailableDiv()));
    chart.draw(data, options);

}

function loadBar(){
  
  var data = getData();
  
  var options = {
    height: 250,
    hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
    vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max },
    bar: {groupWidth: "95%"},
    legend: { position: "none" },
  };
  
  var chart = new google.charts.Bar(document.getElementById(firstAvailableDiv()));
  chart.draw(data, options);

}

function loadColumn(){
  
  var data = getData();
  
  var view = new google.visualization.DataView(data);

  var options = {
    height: 250,
    hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
    vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max },
    bar: {groupWidth: "95%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(document.getElementById(firstAvailableDiv()));
  chart.draw(view, options);

}

function loadDonut(){

  var data = getData();

  var options = {
    height: 250,
    hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
    vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max },
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(document.getElementById(firstAvailableDiv()));
  chart.draw(data, options);

}

function loadGeo(){

  var data = getData();

  var options = {};

  var chart = new google.visualization.GeoChart(document.getElementById(firstAvailableDiv()));

  chart.draw(data, options);

}

function loadLine(){
    
  var data = getData();

    var options = {
      hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue:  data.getColumnRange(0).max  },
      vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max },
      height: 250,
      curveType: 'function' ,
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById(firstAvailableDiv()));

    chart.draw(data, options);

}

function loadPie(){

  var data = getData();
    
  var options = {
      height: 250,
      hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
      vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max }
    };

  var chart = new google.visualization.PieChart(document.getElementById(firstAvailableDiv()));

  chart.draw(data, options);

}

function loadScatter(){
  
  var data = getData();

  var options = {
      height: 250,
      hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
      vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max }
    };

  var chart = new google.visualization.ScatterChart(document.getElementById(firstAvailableDiv()));

  chart.draw(data, options);

}

function loadTable(){
        
  var data = new google.visualization.DataTable();
  
  for(i = 0; i < headers.length; i++)
    data.addColumn('string', headers[i] );
  
  for(var infoLineNumber = 0; infoLineNumber < theInformatics.length; infoLineNumber++){
    
    var rowData = [];
      
    for(i=0;i<headers.length; i++)
      rowData.push( theInformatics[infoLineNumber][headers[i]] );
    
    try{
      data.addRow(rowData);
    }catch(e){}
    
  }

    var table = new google.visualization.Table(document.getElementById(firstAvailableDiv()));

    table.draw(data, {showRowNumber: false});

}

function getData(){
  
  var data = new google.visualization.DataTable();
  var head = headers[0];
  
  data.addColumn('string', head);
  
  for(i = 0; i < intColPosArr.length; i++)
    data.addColumn('number', headers[intColPosArr[i]] );
  
  for( var infoLineNumber = 0; infoLineNumber < theInformatics.length; infoLineNumber++){
    
    var rowData = [ theInformatics[infoLineNumber][head]  ];
      
    for(i=0;i<intColPosArr.length; i++)
      rowData.push( parseInt(theInformatics[infoLineNumber][headers[intColPosArr[i]]] ) );
    
    try{ data.addRow(rowData); }catch(e){}
    
  }
  
  return data;
  
}






