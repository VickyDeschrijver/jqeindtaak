/* 
 * Javascript voor eindtaak jQuery 
 */

$(function() {
    // navigatie door tabs
    $("#inhoud").tabs( {
        active: 0
    });
    
    // hide - show retour datum
    $('#retourdatum').hide();
     
    if($('#retour').checked) {
        $('#retourdatum').show();
    }
    
    $('#retour').click(function() {
        $('#retourdatum').toggle(this.checked);
        if (!this.checked) {
            $('#retourdatum').val("");
        }
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
    $(".vertrekdatum").datepicker( {
            dateFormat:     "yy-mm-dd",
            changeMonth:    true,
            changeYear:     true,
            minDate:        new Date(),
            maxDate:        "+1y"
        });

        // datepicker retours
        $('.vertrekdatum').change(function() {
            $('.terugdatum').val("").datepicker("destroy");     // resetten 'terug' wanneer start w aangepast
            $('.terugdatum').datepicker({
                dateFormat:     "yy-mm-dd",
                minDate:        $('.datum').datepicker("getDate"),
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
    wrapper:        "li"    
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
        wrapper:        "li"    
            
       
    });     // einde valideer frmCheckin
    
    // Slideshow
//    $("#bulletLooper").on('shown', function(e){
//        $('.looper-nav > li', this)
//                .removeClass('active')
//                .eq(e.relatedIndex)
//                .addClass('active');
//    });
    
    // form theme
    
   

    

    
    
}); // einde doc ready

