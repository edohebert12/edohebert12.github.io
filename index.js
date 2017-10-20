var selector = '.pagination li';
var map;
var stations;
var marker;

$(selector).on('click', function(){
    $(selector).removeClass('active');
    $(this).addClass('active');
});

$.ajax({
	url: 'https://secure.bixi.com/data/stations.json',
	dataType: 'json',
	success: function(data){
		stations = $.map(data.stations, function(item){ return item.s; });
	}
});

$("#recherche").autocomplete({
    source : function(request, reponse){
		reponse($.ui.autocomplete.filter(stations,$('#recherche').val()));
	},
	minLength: 2,
	select: function(event,ui) {
		$(".localisation .station").text(ui.item.label);
		$.ajax({
			url: 'https://secure.bixi.com/data/stations.json',
			dataType: 'json',
			success: function(data){
				var station = data.stations.find(function(item){
					return item.s === ui.item.label;
				});
				var pos = new google.maps.LatLng(station.la, station.lo);
				map.panTo(pos);
				map.setZoom(16);
				if(marker == undefined) {
					marker = new google.maps.Marker({map: map});
				}
				marker.setPosition(pos);
			}
		});
	}
});
$("#recherche").autocomplete("widget").addClass("autocomplete-results");

function loadMap() {
	map = new google.maps.Map(document.getElementById("map"),
	{
		center: {lat: 45.50723, lng: -73.615085},
		zoom: 14
	});
}