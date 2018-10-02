$(document).ready(function(){
    $(".button").click(function(){
    
        var number = $(".field_with_number").text();
        var address = $(".field_with_address").text();
  
        $.ajax({
            type: "POST",
            url: "/settings/setmin",
            data: {min: number, addr: address},
            dataType: "html",
            contentType: "application/json;charset=utf-8", 
            success: function(){
                alert("success!");
            },
            error: function() {
                alert( "error" );
              }
        });
    
    });
  });