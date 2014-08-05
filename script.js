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

    $("select").focus(function(){
        $(this).parent().find("input:radio").click();
    });

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
         $("#error_message_no_answer").hide();
         data["form_error"] = false;
         get_element_value("debt", "Do you have any debt?");
         get_element_value_noselect("children", "How many dependent children do you have?");
         get_element_value_noselect("family_survive", "Would your family or loved ones be able to survive financially without you if you were to pass away?");
         get_element_value_noselect("cost_of_living", "If you were unable to ever work again, how would you meet your cost of living?");
         get_element_value_noselect("last_time_insurance", "When was the last time you had your existing insurance or your overall insurance need reviewed?");
         get_element_value_noselect("health_wellness", "Are you actively participating in a structured Health and Wellness program to assist you in meeting your Health and Wellness goals and to recrease your likelihood of ever needing to claim on insurance for health reasons?");
         if (data["form_error"] == false) {
             $('ul.setup-panel li:eq(2)').removeClass('disabled');
             $('ul.setup-panel li:eq(1)').addClass('disabled');
             $('ul.setup-panel li a[href="#step-3"]').trigger('click');
             $("html, body").animate({ scrollTop: 0 }, 600);
         }
     });

     function get_element_value(element_name, error_description) {
         var radio_val = $("input[name=" + element_name + "]:checked").val();
//         console.log(element_name + "=" + radio_val);
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
                 $('#error_message_no_answer').html("Please answer to question " + error_description).fadeIn(500);
                 data["form_error"] = true;
                 break;
         }

     }

     function get_element_value_noselect(element_name, error_description) {
         var radio_val = $("input[name=" + element_name + "]:checked").val();
         switch (radio_val) {
             case "1":
                 data[element_name] = 1;
                 break;

             case "0":
                 data[element_name] = 0;
                 break;

             case "-1":
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
                 $('#error_message_no_answer').html("Please answer to question " + error_description).fadeIn(500);
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
                 data[element_name] += $(this).val();
                 console.log(data);
             });
         } else {
             $("html, body").animate({ scrollTop: 0 }, 600);
             $('#error_message_no_answer').html("Please answer to question " + error_description).fadeIn(500);
             data["form_error"] = true;
         }

     }
     $("#email_form").val($.cookie("email"));

     $('#togglingForm').bootstrapValidator({
         message: 'This value is not valid',
         excluded: [':disabled'],
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields: {
             fullName: {
                 validators: {
                     notEmpty: {
                         message: 'The username is required'
                     }
                 }
             },
             date_of_birth: {
                 validators: {
                     notEmpty: {
                         message: 'The date is required'
                     }
                 }
             },
             phone: {
                 validators: {
                     notEmpty: {
                         message: 'The phone is required'
                     },
                     digits: {
                         message: 'The phone is not valid'
                     }
                 }
             },
             postcode: {
                 validators: {
                     notEmpty: {
                         message: 'The postcode is required'
                     },
                     digits: {
                         message: 'The postcode is not valid'
                     }
                 }
             },
             occupation: {
                 validators: {
                     notEmpty: {
                         message: 'The occupation is required'
                     }
                 }
             }
         }
     })
         .find('[name="date_of_birth"]').mask('00/00/0000');
     $('#activate-finish').click(function(){
         result_input("insurance","answer1");
         result_input("tdp_insurance","answer2");
         result_input("trauma_insurance","answer3");
         result_input("income_insurance","answer4");
         result_checkbox("generale_insurance","answer5");
         result_input("cover_exclusions","answer6");
         $('#drop_page').hide();
         $('#result_page').fadeIn(500);
     });

     function result_input (name_property,id) {
         var property_value = data[name_property];
         console.log(property_value);
         switch (property_value) {
             case 1:
                 $('#' + id).html("Yes");
                 break;
             case 0:
                 $('#' + id).html("No");
                 break;
             case "100000":
                 $('#' + id).html("Yes i have insurance less than $100,000");
                 break;
             case "150000":
                 $('#' + id).html("Yes i have insurance $100,000 - $250,000");
                 break;
             case "1000000":
                 $('#' + id).html("Yes i have insurance $500,000 - $1,000,000");
                 break;
             case "1500000":
                 $('#' + id).html("Yes i have insurance $1,000,000 - $1,500,000");
                 break;
             case "2000000":
                 $('#' + id).html("Yes i have insurance $1,500,000 - $2,000,000");
                 break;
             case "2100000":
                 $('#' + id).html("Yes i have insurance $2,000,000 or more");
                 break;
             default :
                 $('#' + id).html("Not sure");
                 console.log("Fail");
         }
     }

     function result_checkbox (name_property, id) {
         var property_value = data[name_property];
         var result_string = "";
         console.log(property_value);
         for (i=0;i<property_value.length;i++) {
             console.log(property_value[i]);
             switch (property_value[i]) {
                 case "1":
                     result_string += "Home and contents insurance; ";
                     break;
                 case "2":
                     result_string += "Motor vehicle Insurance; ";
                     break;
                 case "3":
                     result_string += "Private health insurance; ";
                     break;
                 case "4":
                     result_string += "Travel insurance; ";
                     break;
                 case "5":
                     result_string += "Pet insurance; ";
                     break;
                 case "6":
                     result_string += "Landlord insurance; ";
                     break;
                 default :
                     result_string = "None";
                     break;
             }
         }
         $('#' + id).html(result_string);
     }
 });