$(document).ready(function(){
    $(".button").click(function(event){
        event.preventDefault();
        $(this).blur();
        if( $(".field_with_number").val().length === 0 || $(".field_with_address").val().length === 0) {
            alert("fill in all fields");
            return false;
        }
        var number = $(".field_with_number").val();
        var address = $(".field_with_address").val();
  
        $.ajax({
            type: "POST",
            url: "/settings/setmin",
            data: {min: number, addr: address},
            dataType: "html",
            contentType: "application/json;charset=utf-8", 
            success: function(response) {
                if (response.success) {
                    console.log('Success!');
                    console.log(response.data);
                    console.log(response.data);

                } else {
                    console.log('Failure 1!');
                    console.log(response.error);
                }
            },
            error: function(xhr, status, text) {
                // var response = $.parseJSON(xhr.responseText);
                var response = xhr;
                console.log('Failure 2!');
                console.log(response.status);
        
                if (response.status === 404) {
                    console.log('response.error');
                } else {
                    // This would mean an invalid response from the server - maybe the site went down or whatever...
                }
            }
        });
        $("form").trigger("reset");
    });
  });
// $(document).ready(function(){
//     $(".button").click(function(){
    
//         var number = $(".field_with_number").val();
//         var address = $(".field_with_address").val();
  
//         $.ajax({
//             type: "POST",
//             url: "http://127.0.0.1:5500/pnch.github.io/pnch",
//             data: {min: number, addr: address},
//             // dataType: "json",
//             // contentType: "application/json;charset=utf-8",
//             statusCode: {
//                 405: function() {
//                     alert( "Settings update failed for " + address);
//                 },
//                 404: function() {
//                     alert( "Settings update failed for " );
//                 },
//                 200: function() {
//                     console.log("-1-1-1-1 WE GOT 200!");
//                 }
//             }, 
//             success: function(data){
//                 alert("success!");
//             },
//             error: function() {
//                 alert( "error" );
//               }
//         });
    
//     });
//   });
