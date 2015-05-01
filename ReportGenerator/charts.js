

var theInformatics = '',

    showArea = true, showBar = true, showColumn = true, showDonut = true, showGeo = true, 
    showLine = true, showPie = true, showTable = false, showScatter = true, 
    
    posTable = 0, posScatter = 0
    
    //columnCount, titles, etc

    ;

function approach(){

    google.load("visualization", "1", {packages:["table", "corechart", "geochart"]});
    google.setOnLoadCallback(initialize); 

}

function initialize(){
  
        reset();
        
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


//  getters/setters
function setInfo(info){
    theInformatics = info;
    loadCharts();
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


//   Fit the following load()'s generic csv data once I can pull it in

function loadArea() {

    var data = google.visualization.arrayToDataTable(theInformatics);

        var options = {
          title: 'Company Performance',
          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById(firstAvailableDiv));
        chart.draw(data, options);

}

function loadBar(){

    var data = google.visualization.arrayToDataTable(theInformatics);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.BarChart(firstAvailableDiv);
      chart.draw(view, options);

}

function loadColumn(){

    var data = google.visualization.arrayToDataTable(theInformatics);

          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Density of Precious Metals, in g/cm^3",
            width: 600,
            height: 400,
            bar: {groupWidth: "95%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.ColumnChart(document.getElementById(firstAvailableDiv));
          chart.draw(view, options);

}

function loadDonut(){

    var data = google.visualization.arrayToDataTable(theInformatics);

            var options = {
              title: 'My Daily Activities',
              pieHole: 0.4,
            };

            var chart = new google.visualization.PieChart(document.getElementById(firstAvailableDiv));
            chart.draw(data, options);

}

function loadGeo(){

    var data = google.visualization.arrayToDataTable(theInformatics);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById(firstAvailableDiv));

            chart.draw(data, options);

}

function loadLine(){

    var data = google.visualization.arrayToDataTable(theInformatics);

            var options = {
              title: 'Company Performance',
              curveType: 'function',
              legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(document.getElementById(firstAvailableDiv));

            chart.draw(data, options);

}

function loadPie(){

    var data = google.visualization.arrayToDataTable(theInformatics);

            var options = {
              title: 'My Daily Activities'
            };

            var chart = new google.visualization.PieChart(document.getElementById(firstAvailableDiv));

            chart.draw(data, options);

}

function loadScatter(){

        var data = google.visualization.arrayToDataTable(theInformatics);

        var options = {
            title: 'Age vs. Weight comparison',
            hAxis: {title: 'Age', minValue: 0, maxValue: 15},
            vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
            legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById(firstAvailableDiv()));

        chart.draw(data, options);

}

function loadTable(){

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addColumn('boolean', 'Full Time Employee');
    data.addRows([
        ['Mike',  {v: 10000, f: '$10,000'}, true],
        ['Jim',   {v:8000,   f: '$8,000'},  false],
        ['Alice', {v: 12500, f: '$12,500'}, true],
        ['Bob',   {v: 7000,  f: '$7,000'},  true]
    ]);

    var table = new google.visualization.Table(document.getElementById(firstAvailableDiv()));

    table.draw(data, {showRowNumber: true});

}







