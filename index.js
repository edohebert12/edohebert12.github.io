var selector = '.pagination li';

$(selector).on('click', function(){
    $(selector).removeClass('active');
    $(this).addClass('active');
});

$("#recherche").autocomplete({
    source : function(requete,reponse){
        $.ajax({
            url:'https://secure.bixi.com/data/stations.json',
            dataType:'json',
            success: function(data){
                var array = $.map(data.stations, function (item) {
                    return item.s;
            });
            reponse($.ui.autocomplete.filter(array,$('#recherche').val()));
        }});
        minLength:2
    },
    select: function(event,ui){
    $(".localisation .station").text(ui.item.label);
    }


});
$("#recherche").autocomplete("widget").addClass("autocomplete-results");

