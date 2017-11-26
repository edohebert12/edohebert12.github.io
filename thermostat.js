console.log(1);
var slider = $("#thermostat").slider({
					orientation: "vertical",
					range: "min",
					min: -10,
					max: 40,
					value: temperatureThermostat,
				});
				
$("#thermostat").slider({
    slide: function(event, ui) {
      $("#tdValeurThermostat").text( ui.value );
    }
  });

var progressbar = $("#thermometre").progressbar({
						max: 100,
						value: 69,
					});

progressbar.children().css("background", "#a40000");
progressbar.removeClass("ui-corner-all");
progressbar.children().removeClass("ui-corner-left");
slider.css("border", "1px solid #8888ff");
slider.css("background", "#d9d9e7");
$(".ui-slider-handle").css("border", "1px solid #8888ff");
$(".ui-slider-range").css("background", "#b9b9c7");
$(".ui-slider-range").removeClass("ui-corner-all");

console.log(2);