/* Fonction qui se lance à l'ouverture de la page */
$(function () {
    /* Initialisation du slider */
    var slider = $("#thermostat").slider({
        max: 40,
        min: -10,
        orientation: 'vertical',
        value: temperatureThermostat
    });

    $("#thermostat").slider({
        change: function(event, ui) {
        $("#tdValeurThermostat").text( ui.value );
        }
    });
    
    /* Initialisation de valeurs du slider */
    slider.css("border", "1px solid #8888ff");
    slider.css("background", "#d9d9e7");
    $(".ui-slider-handle").css("border", "1px solid #8888ff");
    $(".ui-slider-range").css("background", "#b9b9c7");
    $(".ui-slider-range").removeClass("ui-corner-all");
        
    /* Initialisation de la température extérieure */
    $('#valTempExt').html(temperatureExterieure);
});

/* Controller permettant de modifier la view */
function update(newTemp,isHeating) {
    $('#temperature').html(Math.floor(newTemp));
    $('#actif').html(isHeating ? 'Actif' : 'Inactif');
    $('#actif').css('background-color', isHeating ? '#FF0000' : 'white');
    $('#actif').css('color', isHeating ? 'white' : 'black');
    $('#thermometre').attr('value', newTemp);    
}

/* Définition de l'objet Observable */
var Observable = {
    observers: [],
    lastId: -1,
    addObserver: function (observer) {
        this.observers.push({
            callback: observer,
            id: ++this.lastId
        })

        return this.lastId
    },
    removeObserver: function (id) {
        const idx = this.observers.findIndex(e => id === e.id);
        if (idx > -1) {
            this.observers.splice(idx, 1);
        }
    },
    notifyObservers: function () {
        this.observers.forEach(e => e.callback(temperatureInterieure, chauffage));
    }
}

/* Création et assignation de l'observer*/
var Observer = Observable.addObserver(update);

/* Méthode permettant de notifier la view à chaque seconde */
$(function () {
    setInterval(() => {
    ticTac();
    Observable.notifyObservers();
}, intervalleTemps);
});