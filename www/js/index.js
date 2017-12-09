
$("#buttonAdd").click(function(){
    //console.log(app.date()+app.heure())
    /*app.supprimer(0);
    app.supprimer(0);*/
    //app.ajout('16:00');
    //https://cordova.apache.org/docs/fr/latest/cordova/storage/localstorage/localstorage.html
    //console.log('click');
    //console.log($('#time').val());
});


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
        var date = this.date();
        var heure = this.heure();
        date = date + " - " + heure;
        //navigator.notification.alert(date, null, 'date', 'yo');
        //alert(date);
        setInterval(this.alarm, 1000);
    },

    onPause: function(){
        setInterval(this.alarm, 1000);
    },

    // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // },

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

        var dateString = new String();
        dateString += date.getDate() + "/";
        dateString += date.getMonth() + "/";
        //dateString += (parseInt(date.getMonth())+1).toString();
        dateString += date.getFullYear()+ "/";
        return dateString;
    },

    heure: function(date){      // recupere la date sous format heure minute
         if (!date) {var date = new Date();}
         var heure = date.getHours();
         var minutes = date.getMinutes();
         if(minutes < 10)
              minutes = "0" + minutes;
         if (heure < 10)
              heure = "0" + heure;  
         //return heure + "h" + minutes;
         heureString = new String();
         heureString += date.getHours() + ":";
         heureString += date.getMinutes();
         return heureString;
    },

    // verifie si les alarmes rentrees sont égales à la date et heure actuelle
    alarm: function(){      
        var data = localStorage.getItem('alarme');  
        if (data) {  
            console.log(data);
            data = JSON.parse(data);
            var date = new Date();
            date = app.heure(date);
            data.forEach(function(element){
                if (element == date) {
                    app.notif();
                }
            });
        }else(data = [])
    },

    // ajoute une nouvelle alarme
    ajout: function(donnees){   
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(data = [])
        console.log(donnees);
        donnees = $('#'+donnees).val();
        data.push(donnees);
        console.log("data");
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    // supprime une alarme
    supprimer: function(index){
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(console.log(data))
        data.splice(index, 1);
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    // modifier la valeur d'une alarme
    modifier: function(index, nouvelleValeur){
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }else(console.log(data))
        data[index] = nouvelleValeur;
        console.log(data);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    notif: function(){   //notification
        navigator.notification.beep(6);
    },

};

app.initialize();

document.getElementById("champTime").onchange = function(){app.ajout("champTime")};

