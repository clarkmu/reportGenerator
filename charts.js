/*

Check boxes in index.html set showXXX variables in charts.js

selecting a file sends the parsed information (papaparse) into charts.js as theInformaics

API info
get specific cell -  results.data[row][column]
ex:  results.data[22]["header"]

*/

var chart = new function(){ //OLN, this is a namespace
    
    var theInformatics = '',

    showArea, showBar, showColumn, showDonut, showGeo, 
    showLine, showPie, showTable, showScatter,
    
    headers = [],
    
    firstRun = true,
    
    intColPosArr = [],
    
    number_div = ["first", "second", 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth']//,
    
    //toType = function(obj) {
      //return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    //}
    
    ;

var initialize = function(){
  
  reset();
  
  if(firstRun){
      
    //load api only once, else we can't use a second file
      
    firstRun = false;
    google.load("visualization", "1.1", {packages:["table", "corechart", "geochart", "scatter", "controls", "bar"], 'callback': loadCharts });
  }else
    loadCharts();
  
};

var reset = function(){
    
    //make all divs visisble again so firstAvailableDiv() works on next run

    /*var count = number_div.length;
    
    //why does this not wok...
    
    for(var i = 0; i < count; i++){
        
        var div = number_div[i] + "_div";
        
        document.getElementById(div).hidden = true;
        
    }*/



    document.getElementById('first_div').hidden = true;
    document.getElementById('second_div').hidden = true;
    document.getElementById('third_div').hidden = true;
    document.getElementById('fourth_div').hidden = true;
    document.getElementById('fifth_div').hidden = true;
    document.getElementById('sixth_div').hidden = true;
    document.getElementById('seventh_div').hidden = true;
    document.getElementById('eigth_div').hidden = true;
    document.getElementById('ninth_div').hidden = true;

};

var loadCharts = function(){
/*
    if(showArea)
      try{
        this.loadArea();
      }catch(e){alert("Failed to load Area.");}

    if(showBar)
      try{
        this.loadBar();
      }catch(e){alert("Failed to load Bar.");}

    if(showColumn)
      try{
        this.loadColumn();
      }catch(e){alert("Failed to load Column.");}

    if(showDonut)
      try{
        this.loadDonut();
      }catch(e){alert("Failed to load Donut.");}

    if(showGeo)
      try{
        this.loadGeo();
      }catch(e){alert("Failed to load Table.");}

    if(showLine)
      try{
        this.loadLine();
      }catch(e){alert("Failed to load Line.");}

    if(showPie)
      try{
        this.loadPie();
      }catch(e){alert("Failed to load Pie.");}

    if(showScatter)
      try{
          this.loadScatter();
      }catch(e){alert("Failed to load Scatter.");}

    if(showTable)
      try{
        this.loadTable();
      }catch(e){alert("Failed to load Table.");}

/*  switch this for the above section to view errors in console*/

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
    //*/
};

var firstAvailableDiv = function(){  //place the chart wherever

    var count = number_div.length;
    
    for(var i = 0; i < count; i++){
        
        var div = number_div[i] + "_div";
        
        if( document.getElementById(div).hidden ){
            document.getElementById(div).hidden = false;
            return div;
        }
        
    }

};




//  GETTERS/SETTERS



this.setInfo = function(info){
    theInformatics = info;
    initialize();
};
this.setArea = function(bool){ showArea = bool; };
this.setBar = function(bool){ showBar = bool; };
this.setColumn = function(bool){ showColumn = bool; };
this.setDonut = function(bool){ showDonut = bool; };
this.setGeo = function(bool){ showGeo = bool; };
this.setLine = function(bool){ showLine = bool; };
this.setPie = function(bool){ showPie = bool; };
this.setTable = function(bool){ showTable = bool; };
this.setScatter = function(bool){ showScatter = bool; };

this.setHeaders = function(str){ headers = str; };
this.setIntColumnPositionArray = function(arr){ intColPosArr = arr; };



//       CHART LOAD FUNCTIONS



var loadArea = function() {

  var data = getData();

    var options = {
      height: 250,
      hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
      vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max },
    };

    var chart = new google.visualization.AreaChart(document.getElementById(firstAvailableDiv()));
    chart.draw(data, options);

};

var loadBar = function(){
  
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

};

var loadColumn = function(){
  
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

};

var loadDonut = function(){

  var data = getData();

  var options = {
    height: 250,
    hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
    vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max },
    pieHole: 0.4,
  };

  var chart = new google.visualization.PieChart(document.getElementById(firstAvailableDiv()));
  chart.draw(data, options);

};

var loadGeo = function(){

  var data = getData();

  var options = {};

  var chart = new google.visualization.GeoChart(document.getElementById(firstAvailableDiv()));

  chart.draw(data, options);

};

var loadLine = function(){
    
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

};

var loadPie = function(){

  var data = getData();
    
  var options = {
      height: 250,
      hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
      vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max }
    };

  var chart = new google.visualization.PieChart(document.getElementById(firstAvailableDiv()));

  chart.draw(data, options);

};

var loadScatter = function(){
  
  var data = getData();

  var options = {
      height: 250,
      hAxis: {title: data.getColumnLabel(0), minValue: data.getColumnRange(0).min, maxValue: data.getColumnRange(0).max  },
      vAxis: {title: data.getColumnLabel(1), minValue: data.getColumnRange(1).min, maxValue: data.getColumnRange(1).max }
    };

  var chart = new google.visualization.ScatterChart(document.getElementById(firstAvailableDiv()));

  chart.draw(data, options);

};

var loadTable = function(){
    
  //load each row and each header, don't use generic data function
        
  var data = new google.visualization.DataTable();
  
  for(var i = 0; i < headers.length; i++)
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

};

var getData = function(){
  
  var data = new google.visualization.DataTable();
  var head = headers[0];
  
  data.addColumn('string', head);
  
  for(var i = 0; i < intColPosArr.length; i++)
    data.addColumn('number', headers[intColPosArr[i]] );
  
  for( var j = 0; j < theInformatics.length; j++){
    
    var rowData = [ theInformatics[j][head]  ];
      
    for(i=0;i<intColPosArr.length; i++)
      rowData.push( parseInt(theInformatics[j][headers[intColPosArr[i]]] ) );
    
    try{ data.addRow(rowData); }catch(e){}
    
  }
  
  return data;
  
};

}();



