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
	minLength: 1,
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
				updateNameColor("#station-id",station.id);
				updateNameColor("#blq",station.b)
				updateNameColor("#velos-dispo",station.ba);
				updateNameColor("#bornes-dispo",station.da);
				updateNameColor("#susp",station.su);
				updateNameColor("#velos-indispo",station.bx);
				updateNameColor("#hs",station.m)
				updateNameColor("#bornes-indispo",station.dx)
	
				marker.setPosition(pos);
			}
		});
	}
});
$("#recherche").autocomplete("widget").addClass("autocomplete-results");

function updateNameColor(selector,value){
	if(typeof(value) === "boolean"){	
		if(value==false){
			$(selector).text("Non");
			$(selector).css("background-color", "green");
		} else{
		$(selector).text("Oui");
		$(selector).css("background-color", "red");		
		}
	}else{
		if(selector == "#velos-dispo" || selector == "#bornes-dispo"){
			if(value <= 3) {
				$(selector).css("background-color", "red");
			} else {
				$(selector).css("background-color", "green");
			}
		} 
	$(selector).text(value);
	}
}

function loadMap() {
	map = new google.maps.Map(document.getElementById("map"),
	{
		center: {lat: 45.50723, lng: -73.615085},
		zoom: 14
	});
}