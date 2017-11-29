

$("#test").click(function(){
    app.ajout(258665);
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
        navigator.notification.alert(date, null, 'date', 'yo');
        //alert(date);
        //setInterval(this.alarm, 1000);
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

    date: function(date){       // recupere la date sous format jour jour mois annee
        // les noms de jours / mois
        var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
        var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
        // on recupere la date
        if (!date) {var date = new Date();}
        // on construit le message
        var message = jours[date.getDay()] + " ";   // nom du jour
        message += date.getDate() + " ";   // numero du jour
        message += mois[date.getMonth()] + " ";   // mois
        message += date.getFullYear();
        return message;
    },

    heure: function(date){      // recupere la date sous format heure minute
         if (!date) {var date = new Date();}
         var heure = date.getHours();
         var minutes = date.getMinutes();
         if(minutes < 10)
              minutes = "0" + minutes;
         if (heure < 10)
              heure = "0" + heure;  
         return heure + "h" + minutes;
    },

    alarm: function(){      // verifie si les alarmes rentrees sont égales à la date et heure actuelle
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
            var date = new date;
            data.foreach(function(element){
                if (element == date) {
                    this.alert();
                    break;
                }
            });
        }else(data = [])
    },

    ajout: function(donnees){   // ajoute une nouvelle alarme
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(data = [])
        data.push(donnees);
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    supprimer: function(index){ // supprime une alarme
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(console.log(data))
        data.splice(index, 1);
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    modifier: function(index, nouvelleValeur){  // modifier la valeur d'une alarme
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(console.log(data))
        data[index] = nouvelleValeur;
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    alert: function(){   //notification

    },

};

app.initialize();