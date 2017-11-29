

$("#test").click(function(){
    //app.ajout(1);
    app.supprimer(0);
    //https://cordova.apache.org/docs/fr/latest/cordova/storage/localstorage/localstorage.html
});



var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        var date = this.date();
        var heure = this.heure();
        date = date + " - " + heure;
        console.log(cordova.file);
        //alert(date);
        //setInterval(this.alarm);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    date: function(){
        // les noms de jours / mois
        var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
        var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
        // on recupere la date
        var date = new Date();
        // on construit le message
        var message = jours[date.getDay()] + " ";   // nom du jour
        message += date.getDate() + " ";   // numero du jour
        message += mois[date.getMonth()] + " ";   // mois
        message += date.getFullYear();
        return message;
    },

    heure: function(){
         var date = new Date();
         var heure = date.getHours();
         var minutes = date.getMinutes();
         if(minutes < 10)
              minutes = "0" + minutes;
         if (heure < 10)
              heure = "0" + heure;  
         return heure + "h" + minutes;
    },

    alarm: function(){

    },

    ajout: function(donnees){
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(data = [])
        data.push(donnees);
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    supprimer: function(index){
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(console.log(data))
        data.splice(index, 1);
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    }

};

app.initialize();