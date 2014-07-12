 $(document).ready(function(){
     var data = {
         "form_error": false
     };
     if ($.cookie("email")) {
         $('#main_page').hide();
         $('#drop_page').fadeIn(500);
         $("html, body").animate({ scrollTop: 0 }, 600);
     } else {
//         $('#main_page').fadeIn(0);
         $('#button').click(function(){
             $('#error_message').hide();
             if ($('#email').val() != "") {
                 console.log("Good");
                 $.cookie("email", $('#email').val(), 30);
                 //alert($.cookie("email"));
                 $('#main_page').hide();
                 $('#drop_page').fadeIn(500);
                 $("html, body").animate({ scrollTop: 0 }, 600);

             } else {
                 $('#error_message').fadeIn(500);
             }
         });
     }
//    $('#button').click(function(){
//        $('#error_message').hide();
//        if ($('#email').val() != "") {
//                console.log("Good");
//                $.cookie("email", $('#email').val(), 30);
//                //alert($.cookie("email"));
//                $('#main_page').hide();
//                $('#drop_page').fadeIn(500);
//                $("html, body").animate({ scrollTop: 0 }, 600);
//
//        } else {
//                $('#error_message').fadeIn(500);
//                }
//        });
$("select").focus(function(){
    $(this).parent().find("input:radio").click();
});
     //save input value
//     $("#activate-step-2").click(function(){
//         // validate insurance
//         //alert($("input[name=insurance]:checked").val());
//
//         get_element_value("insurance");
//         get_element_value("tdp_insurance");
//         get_element_value("trauma_insurance");
//         get_element_value("income_insurance");
//         get_checkbox_value("generale_insurance");
//         get_element_value_noselect("cover_exclusions");
//     });
//     $("#activate-step-3").click(function(){
//         // validate insurance
//         //alert($("input[name=insurance]:checked").val());
//
//         get_element_value("debt");
//         get_element_value_noselect("children");
//         get_element_value_noselect("family_survive");
//         get_element_value_noselect("cost_of_living");
//         get_element_value_noselect("last_time_insurance");
//         get_element_value_noselect("health_wellness");
//     });

 //Steps
     var navListItems = $('ul.setup-panel li a'),
         allWells = $('.setup-content');

     allWells.hide();

     navListItems.click(function(e)
     {
         e.preventDefault();
         var $target = $($(this).attr('href')),
             $item = $(this).closest('li');

         if (!$item.hasClass('disabled')) {
             navListItems.closest('li').removeClass('active');
             $item.addClass('active');
             allWells.hide();
             $target.show();
         }
     });

     $('ul.setup-panel li.active a').trigger('click');

     // DEMO ONLY //

     $('#activate-step-2').on('click', function(e) {
         $("#error_message_no_answer").hide();
         data["form_error"] = false;
         get_element_value("insurance", "Do you have Life insurance?");
         get_element_value("tdp_insurance", "Do you have Total & Permanent Disablement (TDP) insurance?");
         get_element_value("trauma_insurance" , "Do you have Trauma insurance?");
         get_element_value("income_insurance", "Do you have Income Protection insurance?");
         get_checkbox_value("generale_insurance","Which of the following general insurances do you have?");
         get_element_value_noselect("cover_exclusions", "Does your current insurance cover have default exclusions?");
         if (data["form_error"] == false) {
            $('ul.setup-panel li:eq(1)').removeClass('disabled');
            $('ul.setup-panel li:eq(0)').addClass('disabled');
            $('ul.setup-panel li a[href="#step-2"]').trigger('click');
            $("html, body").animate({ scrollTop: 0 }, 600);
         }
//         return false;
//         $(this).remove();
     });
     $('#activate-step-3').on('click', function(e) {
         $('ul.setup-panel li:eq(2)').removeClass('disabled');
         $('ul.setup-panel li:eq(1)').addClass('disabled');
         $('ul.setup-panel li a[href="#step-3"]').trigger('click');
         get_element_value("debt");
         get_element_value_noselect("children");
         get_element_value_noselect("family_survive");
         get_element_value_noselect("cost_of_living");
         get_element_value_noselect("last_time_insurance");
         get_element_value_noselect("health_wellness");
         $("html, body").animate({ scrollTop: 0 }, 600);
//         return false;
//         $(this).remove();
     });

//     function get_element_value(element_name) {
//         var radio_val = $("input[name=" + element_name + "]:checked").val();
//         if (radio_val == 1) {
//             data[element_name] = $("#" + element_name + "_value option:selected").val();
//         } else if (radio_val == 0) {
//             data[element_name] = 0;
//         } else if (radio_val == -1) {
//             data[element_name] = -1;
//         } else {
//             $("html, body").animate({ scrollTop: 0 }, 600);
//             $('#error_message_no_answer').fadeIn(500);
//         }
////         console.log(data);
//     }
     function get_element_value(element_name, error_description) {
         var radio_val = $("input[name=" + element_name + "]:checked").val();
         console.log(element_name + "=" + radio_val);
         switch (radio_val) {
             case "1":
                 data[element_name] = $("#" + element_name + "_value option:selected").val();
                 break;
             case "0":
                 data[element_name] = 0;
                 break;
             case "-1":
                 data[element_name] = -1;
                 break;
             default :
                 $("html, body").animate({ scrollTop: 0 }, 600);
                 $('#error_message_no_answer').html("Please answer to question" + error_description).fadeIn(500);
                 data["form_error"] = true;
                 break;
         }

     }

     function get_element_value_noselect(element_name, error_description) {
         var radio_val = $("input[name=" + element_name + "]:checked").val();
         switch (radio_val) {
             case "1":
                 data[element_name] = 1;
//             data.tdp_insurance = "test1_tdp";

                 break;

             case "0":
                 //data = JSON.stringify({element_name:0});
                 //alert("No");
                 data[element_name] = 0;

                 break;

             case "-1":
                 //alert("Not sure");
                 //data = JSON.stringify({element_name:-1});
                 data[element_name] = -1;

                 break;

             case "2":
                 data[element_name] = 2;

                 break;

             case "3":
                 data[element_name] = 3;

                 break;

             case "4":
                 data[element_name] = 4;

                 break;

             case "5":
                 data[element_name] = 5;

                 break;

             case "6":
                 data[element_name] = 6;

                 break;
             default:
                 $("html, body").animate({ scrollTop: 0 }, 600);
                 $('#error_message_no_answer').html("Please answer to question" + error_description).fadeIn(500);
                 data["form_error"] = true;

                 break;
         }

//         console.log(data);
     }

     function get_checkbox_value (element_name, error_description) {
         data[element_name] = "";
//         console.log($("input[name=" + element_name + "]:checked"));
         if ($("input[name=" + element_name + "]:checked").length > 0) {
             $("input[name=" + element_name + "]:checked").each(function(){
//             console.log($(this));
                 data[element_name] += $(this).val() + ";";
                 console.log(data);
             });
         } else {
             $("html, body").animate({ scrollTop: 0 }, 600);
             $('#error_message_no_answer').html("Please answer to question " + error_description).fadeIn(500);
             data["form_error"] = true;
         }

     }
//     $('#activate-step-2').click(function(){
//         $("html, body").animate({ scrollTop: 0 }, 600);
//         return false;
//     });
     $("#email_form").val($.cookie("email"));

 });