
function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

$(document).ready(function(){
  
  $(".draggable").draggable({snap:true});
  
  $("#fileSelect").change(function(){

      var file = $('#fileSelect');
      
      Papa.parse(file[0].files[0], {
          header:true,
          complete: function(results) {
            
            var headers = results.meta['fields'];
            var intColumnPositionArray = [];
            
            for(var i = 0; i < headers.length; i++)
              if(isInt(results.data[3][headers[i]]) && results.data[3][headers[0]] !== "Total"){
                intColumnPositionArray.push(i);
              }
            
            chart.setIntColumnPositionArray(intColumnPositionArray);
            
            chart.setHeaders(results.meta['fields']);
            
            chart.setInfo(results.data); //with initialize
            
          }
      });
  
  });

  $("#area").click(function(){

      chart.setArea(this.checked);

  });

  $("#bar").click(function(){

      chart.setBar(this.checked);

  });

  $("#column").click(function(){

      chart.setColumn(this.checked);

  });

  $("#donut").click(function(){

      chart.setDonut(this.checked);

  });

  $("#geo").click(function(){

      chart.setGeo(this.checked);

  });

  $("#line").click(function(){

      chart.setLine(this.checked);

  });

  $("#pie").click(function(){

      chart.setPie(this.checked);

  });

  $("#scatter").click(function(){

      chart.setScatter(this.checked);

  });


  $("#table").click(function(){

      chart.setTable(this.checked);

  });

});