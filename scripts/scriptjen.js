/* 
 * Javascript voor eindtaak jQuery 
 */




$(function() {
 

   
    
    // hide - show retour datum
    $('#retourdatum').show();
       if(!$('#retour').checked) {
       $('#retourdatum').hide();
   }
   
   $('#retour').click(function() {
       $('#retourdatum').toggle(this.checked);
      if (!this.checked) {
           $('#terugdatum').val("").datepicker();
       }
   });
   
   if($('#terugdatum').val("")) {
       $('#retour').attr('checked', false);
   }
  

    
    
    
     // navigatie door tabs
    $("#inhoud").tabs( {
        active: 0
    });
    
    // Keuzelijst LANDEN invullen
    $('#countries').append("<option value=''>--- Kies een land ---</option>");  
    $.getJSON("php/ajax_json_countries.php", function(data) {
        $.each(data, function() {
            $('#countries').append("<option value='" + this.country_code + "'>" + this.country_name + "</option>");
        });
    });
    
    // Keuzelijst LUCHTHAVENS invullen
    $(".airports").hide();
    
    $('#countries').change(function() {
        $("#countries option:selected").each(function(){
//            console.log('You will not see this')
            $(".airports").show();
//            console.log(this);
        });
        var waarde = $(this).val();
        $('#airports').empty().append("<option value=''>--- Kies luchthaven ---</option>");// leeg luchthavensdropdown en voeg default optie terug toe
        if (waarde) {
            $.getJSON("php/ajax_json_airports.php?country_code=" + waarde, function(data) {
                $.each(data, function() {
                    $('#airports').append("<option value='" + this.airport_code + "'>" + this.airport_name + "</option>");
                });
            });
        }
    });
    
    // datecontrol op data velden (function onder doc ready
    $.datepicker.setDefaults($.datepicker.regional['nl-BE']);
    
        // datepicker vlucht boeken
        $("#vertrekdatum").datepicker( {
            dateFormat:     "yy-mm-dd",
            changeMonth:    true,
            changeYear:     true,
            minDate:        new Date(),
            maxDate:        "+1y"
        });
        
        $('#vertrekdatum').change(function() {
            $('#terugdatum').val("").datepicker("refresh");                     // resetten 'terug' wanneer start w aangepast
            $('#terugdatum').datepicker({
                dateFormat:     "yy-mm-dd",
                minDate:        $('#vertrekdatum').datepicker("getDate"),
                maxDate:        "+1y",
                changeMonth:    true,
                changeYear:     true
            });
        });  
       
       // datepicker zoek hotel
       $("#checkindatum").datepicker( {
            dateFormat:     "yy-mm-dd",
            changeMonth:    true,
            changeYear:     true,
            minDate:        new Date(),
            maxDate:        "+1y"
        });
        
       $('#checkindatum').change(function() {
            $('#checkoutdatum').val("").datepicker("refresh");                  // resetten 'terug' wanneer start w aangepast
            $('#checkoutdatum').datepicker({
                dateFormat:     "yy-mm-dd",
                minDate:        $('#checkindatum').datepicker("getDate"),
                maxDate:        "+1y",
                changeMonth:    true,
                changeYear:     true
            });
        });  
        
        // datepicker wagen boeken
       $("#pickupdatum").datepicker( {
            dateFormat:     "yy-mm-dd",
            changeMonth:    true,
            changeYear:     true,
            minDate:        new Date(),
            maxDate:        "+1y"
        });
        
       $('#pickupdatum').change(function() {
            $('#dropoffdatum').val("").datepicker("refresh");     // resetten 'terug' wanneer start w aangepast
            $('#dropoffdatum').datepicker({
                dateFormat:     "yy-mm-dd",
                minDate:        $('#pickupdatum').datepicker("getDate"),
                maxDate:        "+1y",
                changeMonth:    true,
                changeYear:     true
            });
        });  
       
    // Enkel letters en nummers
    $.validator.addMethod("checkleestekens", function (value, element) {
        return value.match(/^([a-zA-Z0-9]+)$/);
    });
    
    // validatie form VLUCHT
    var $foutBoks =   $('#vluchtFouten');
    
    $('#frmVlucht').validate({
    debug:          true,
    rules:          {
        vertrekdatum:  {
            required:   true,
            dateISO:    true
        },
        terugdatum:     {
            required: "#retour:checked",
            dateISO: true
        },
        tickettype:     {
            required:   true
        }
    },
    messages:       {
        vertrekdatum:   {
            required:   "Gelieve een vertrekdatum in te geven",
            dateISO:    "De datum moet in volgend formaat zijn: YYYY-MM-DD"
        },
        terugdatum:     "De datum moet in volgend formaat zijn: YYYY-MM-DD",
        tickettype:     "Gelieve aan te duiden welk soort ticket u wenst"
    },
    errorContainer: $foutBoks,
    errorLabelContainer:    $("ul", $foutBoks),
    wrapper:        "li",  
    submitHandler:  function(form) {
            form.submit();
        }
    });     // einde valideer frmVlucht
    
    // validatie form CHECKIN
    var $foutBoks2 =   $('#checkinFouten');
    $('#frmCheckin').validate({
        debug:      true,
        rules:      { 
            boekingreferentie:  {
                required:   true,
                minlength:  6,
                maxlength:  6,
                checkleestekens:    true
            },
            kredietkaartnummer: {
                required:   true,
                creditcard: true
            },
            familienaam:    true
        },
        messages:   {
            boekingreferentie: {
                required:   "Gelieve een referentienummer in te geven",
                minlength:  "Het referentienummer moet exact 6 tekens bevatten",
                maxlength:  "Het referentienummer moet exact 6 tekens bevatten",
                checkleestekens:    "Het nummer mag enkel letters en getallen bevatten"
            },
            kredietkaartnummer: {
                required:   "Graag uw kredietkaartnummer ingeven",
                creditcard: "Dit is geen geldig kredietkaartnummer"
            },
            familienaam:    "Geef uw familienaam aub"
        },
        errorContainer: $foutBoks2,
        errorLabelContainer:    $("ul", $foutBoks2),
        wrapper:        "li",    
        submitHandler:  function(form) {
            form.submit();
        }       
    });     // einde valideer frmCheckin
    
    // Slideshow
    // http://fotorama.io/
    $('.fotorama').fotorama({
        width:              700,
        maxwidth:           '100%',
        nav:                false,
        autoplay:           true,
        stopautoplayontouch:true,
        click:              false,
        loop:               true,
        transition:         "dissolve"

        
      });
    
   

    

    
    
}); // einde doc ready



