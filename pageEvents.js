
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
            var last = results.data.length - 1;
            var intColumnPositionArray = [];
            var intColumnHeadersArray = [];
            
            while(last > 1){
              
              check = results.data[last][headers[0]];
              
              if(check !== undefined){
                if(check !== "Total")
                  last--;
                else
                  break;
                  
              }
              
            }
            
            if(last < 1){
              alert('Error reading file');
              return;
            }
            
            for(var i = 0; i < headers.length; i++)
              if(isInt(results.data[3][headers[i]]) && results.data[3][headers[0]] !== "Total"){
                intColumnPositionArray.push(i);
              }
            
            var set = results.data[last];
            var out = Object.keys(set).map(function(key){ return set[key]; }) ;
            
            //setFile(results);
            
            setIntColumnPositionArray(intColumnPositionArray);
            
            setHeaders(results.meta['fields']);
            
            setTotalLine(out);
            
            
            
            
            
            
            
            //console.log(results.meta['fields']);
            //console.log(results.data);
            
            setInfo(results.data); //with initialize
            
            //get cell  results.data[i][ header string (ex 'Cost' ]
            
          }
      });
  
  });

  $("#area").click(function(){

      setArea(this.checked);

  });

  $("#bar").click(function(){

      setBar(this.checked);

  });

  $("#column").click(function(){

      setColumn(this.checked);

  });

  $("#donut").click(function(){

      setDonut(this.checked);

  });

  $("#geo").click(function(){

      setGeo(this.checked);

  });

  $("#line").click(function(){

      setLine(this.checked);

  });

  $("#pie").click(function(){

      setPie(this.checked);

  });

  $("#scatter").click(function(){

      setScatter(this.checked);

  });


  $("#table").click(function(){

      setTable(this.checked);

  });

});