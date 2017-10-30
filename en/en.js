var selector = '.pagination li';
var map;
var stations;
var marker;
var table;
var isLoaded = false;
$('.loading').show();
/* Information pas clair, donc nous avons décidé de chargé une seule fois le json avec ajax 
et de réutilisé ces informations afin d'augmenté la performance. De plus, l'API ne nous permet pas de filter les données sur la request get, donc 
ce n'est pas performant de chargé toujours le json */
$.ajax({
	url: 'https://secure.bixi.com/data/stations.json',
	dataType: 'json',
	success: function(data){
		stations = $.map(data.stations, function(item){ return item});
		stationsNames = $.map(data.stations, function(item){ return item.s});
		loadTable();
		$('.loading').hide();
	}
});

/* Changement d'onglets */
$(selector).on('click', function(){
    $(selector).removeClass('active');
	$(this).addClass('active');
	if(this.id === "liste") {
		showTable();
	}
	else {
		showListe();
	}
});

/* Load la table */
function loadTable() {
	if(!isLoaded){
		var tableBody = $('#liste-des-stations')[0].getElementsByTagName('tbody')[0]
		tableBody.innerHTML = "";
		for(var index in stations) {
			var station = stations[index];
			tableBody.innerHTML += "<tr><td>" + station.id.toString() + "</td><td>" + station.s + "</td><td>" + station.ba + "</td><td>" + station.da + "</td><td>" + (station.b ? "Yes" : "No") + "</td><td>" + (station.su ? "Yes" : "No") + "</tr>";
			isLoaded = true;
		}
	}
}
/* Affiche la table */
function showTable(){
	if(table != undefined) {
				table.destroy();
		}
		$('table').css('width','90vw');

		table = $('#liste-des-stations').DataTable({"pageLength": 10,"dom": '<"top"f>rt<"bottom"<"table-page"li><"page-numbers"p>><"clear">'});
		$(".bottom").css("width", $("#liste-des-stations").width());
		$(".table-page").css("float", "left");
		$(".page-numbers").css("float", "right");

		$('.section1').hide();
		$('.section2').show();
};

function showListe() {
	/* Devrais être dans une box avec la progress bar */
	$('table').css('width','57.5vw');
	$('.section1').show();
	$('.section2').hide();
}

/* Auto complete */
$("#recherche").autocomplete({
    source : function(request, reponse){
		reponse($.ui.autocomplete.filter(stationsNames,$('#recherche').val()));
	},
	minLength: 1,
	select: function(event,ui) {
		$(".localisation .station").text(ui.item.label);
		var station = stations.find(function(item){
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
$("#recherche").autocomplete("widget").addClass("autocomplete-results");

function updateNameColor(selector,value){
	if(typeof(value) === "boolean"){	
		if(value==false){
			$(selector).text("No");
			$(selector).css("background-color", "green");
		} else{
		$(selector).text("Yes");
		$(selector).css("background-color", "red");		
		}
	}else{
		if(selector == "#velos-dispo" || selector == "#bornes-dispo"){
			if(value == 0) {
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