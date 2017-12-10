
$(".divLibelleApp").click(function(){
    app.supprimer(0);
    app.supprimer(0);
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
        setInterval(this.alarm, 1000);
    },

    onPause: function(){
        setInterval(this.alarm, 1000);
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
         heureString += heure + ":";
         heureString += minutes;
         return heureString;
    },

    // verifie si les alarmes rentrees sont égales à la date et heure actuelle
    alarm: function(){      
        var data = localStorage.getItem('alarme');  
        if (data) {  
            var validate;
            var index = 0;
            console.log(data);
            data = JSON.parse(data);
            var date = new Date();
            date = app.heure(date);
            console.log(date);
            data.forEach(function(element){
                validate = document.getElementById("inputCheckbox" + index).checked;
                if(validate) console.log(element);
                if (element == date && validate) {
                    app.notif();
                }
                index ++;
            });
        }else(data = [])
    },

    // ajoute une nouvelle alarme
    ajout: function(){   
        var data = localStorage.getItem('alarme');  
        var dataC = localStorage.getItem('alarmeC');
        if (data) {  
            data = JSON.parse(data);
        }
        else data = [];

        if (dataC) {
            dataC = JSON.parse(dataC);
        }
        else dataC = [];

        console.log(dataC);
        console.log(data);
        data.push("00:00");
        dataC.push(0);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
        localStorage.setItem('alarmeC', JSON.stringify(dataC, null, '\t'));
    },

    // supprime une alarme
    supprimer: function(index){
        var data = localStorage.getItem('alarme');  
        var dataC = localStorage.getItem('alarmeC');
        if (data) {  
            data = JSON.parse(data);
            dataC = JSON.parse(dataC);
        }
        data.splice(index, 1);
        dataC.splice(index, 1);
        console.log(data);
        console.log(dataC);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
        localStorage.setItem('alarmeC', JSON.stringify(dataC, null, '\t'));
    },

    // modifie la valeur d'une alarme
    modifier: function(index, donnees){
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }
        data[index] = $('#'+donnees).val();
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    // modifie la valeur d'un input checkbox
    modifierC : function(index){
        var validate = document.getElementById("inputCheckbox" + index).checked;
        var dataC = localStorage.getItem('alarmeC');
        if (dataC) {  
            dataC = JSON.parse(dataC);
        }
        if (validate) {
            dataC[index] = 1;
        }
        else dataC[index] = 0;
        localStorage.setItem('alarmeC', JSON.stringify(dataC, null, '\t'));
    },

    //notification
    notif: function(){   
        navigator.notification.beep(1);
    },

    //retourne la longueur du tableau de données
    nextIndex: function(){
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
            var lenght = 0;
            for (var key in data) {
                if (data.hasOwnProperty(key)) {lenght++;}
            }
            return lenght;
        } 
        else return 0;

    },

    //retourne le tableau de données
    tableauAlarme: function(){
        var data = localStorage.getItem('alarme');  
        if (data) {  
            data = JSON.parse(data);
        }
        else(data = [])
        return data;
    },

    //retourne le tableau des états des checkbox
    tableauC: function(){
        var dataC = localStorage.getItem('alarmeC');  
        if (dataC) {  
            dataC = JSON.parse(dataC);
        }
        else(dataC = [])
        return dataC;
    },

};

app.initialize();

