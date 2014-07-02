 $(document).ready(function(){
    $('#button').click(function(){
        $('#error_message').hide();
        if ($('#email').val() != "") {
                console.log("Good");
                $.cookie("email", $('#email').val(), 30);
                //alert($.cookie("email"));
                $('#main_page').hide();
                $('#drop_page').fadeIn(500); 
                    } else {
                $('#error_message').fadeIn(500);
                }
        });
        
    });