var theInformatics = '',

    firstRun = true,

    hideTable = true,//false,
    hideScatter = false,//true,
    posTable = 0, posScatter = 0

    ;

function approach(){

    google.load("visualization", "1", {packages:["table", "corechart"]});
    google.setOnLoadCallback(initialize); 

}

function initialize(){

    if(firstRun){
        firstRun = false;
        //loadTable();
        //loadScatter();
    }else{
        loadCharts();
    }

}

function reset(){

    document.getElementById('first_div').hidden = true;
    document.getElementById('second_div').hidden = true;
    document.getElementById('third_div').hidden = true;
    document.getElementById('fourth_div').hidden = true;

}

function loadCharts(){

    if(!hideTable)
        loadTable();

    if(!hideScatter)
        loadScatter();

}

function unloadChart(chart){}

function firstAvailableDiv(){

    if( document.getElementById('first_div').hidden == true ){
        document.getElementById('first_div').hidden = false;
        return "first_div";
    }

    if( document.getElementById('second_div').hidden == true ) {
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

    return '';

}



function setInfo(info){
    theInformatics = info;
    loadCharts();
}
function setTable(bool){ hideTable = bool; }
function setScatter(bool){ hideScatter = bool; }

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

function loadScatter(){

        var data = google.visualization.arrayToDataTable(theInformatics);
/*
        var data = google.visualization.arrayToDataTable([
            ['Age', 'Weight'],
            [ 8,      12],
            [ 4,      5.5],
            [ 11,     14],
            [ 4,      5],
            [ 3,      3.5],
            [ 6.5,    7]
        ]);
*/
        var options = {
            title: 'Age vs. Weight comparison',
            hAxis: {title: 'Age', minValue: 0, maxValue: 15},
            vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
            legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById(firstAvailableDiv()));

        chart.draw(data, options);

}