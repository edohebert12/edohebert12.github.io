console.log(1);
$("#thermostat").slider({
					orientation: "vertical",
					range: "min",
					min: -10,
					max: 40,
					value: temperatureThermostat,
				});
				
$("#thermostat").slider({
    change: function(event, ui) {
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

console.log(2);