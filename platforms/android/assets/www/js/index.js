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
        cordova.plugins.notification.local.requestPermission();
        cordova.plugins.backgroundMode.enable();
        setInterval(this.alarm, 1000);
    },

    onPause: function(){
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
            data = JSON.parse(data);
            var date = new Date();
            date = app.heure(date);
            var dataC = app.tableauC();
            data.forEach(function(element){
                validate = dataC[index];
                if (element == date && validate) {
                    app.notif(index);
                }
                index ++;
            });
        }
    },

    // ajoute une nouvelle alarme
    ajout: function(){   
        var data = this.tableauAlarme();  
        var dataC = this.tableauC();
        data.push("00:00");
        dataC.push(0);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
        localStorage.setItem('alarmeC', JSON.stringify(dataC, null, '\t'));
    },

    // supprime une alarme
    supprimer: function(index){
        var data = this.tableauAlarme();  
        var dataC = this.tableauC();
        data.splice(index, 1);
        dataC.splice(index, 1);
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
        localStorage.setItem('alarmeC', JSON.stringify(dataC, null, '\t'));
    },

    // modifie la valeur d'une alarme
    modifier: function(index, donnees){
        var data = this.tableauAlarme();
        data[index] = $('#'+donnees).val();
        localStorage.setItem('alarme', JSON.stringify(data, null, '\t'));
    },

    // modifie la valeur d'un input checkbox
    modifierC : function(index){
        var validate = document.getElementById("inputCheckbox" + index).checked;
        var dataC = this.tableauC();
        if (validate) {
            dataC[index] = 1;
        }
        else dataC[index] = 0;
        localStorage.setItem('alarmeC', JSON.stringify(dataC, null, '\t'));
    },

    //notification
    notif: function(index){   
        //Param de la notification
        cordova.plugins.notification.local.schedule({
            title: 'WakeUp',
            text: 'Debout',
            foreground: true,
            vibrate: true,
            actions: [{ id: index.toString(), title: 'desactiver' }]
        });

        //desactive l'alarme quand on appui sur desactiver
        cordova.plugins.notification.local.on(index.toString(), function () {
            document.getElementById("inputCheckbox" + index).checked = false;
            var dataC = app.tableauC();
            dataC[index] = 0;
            localStorage.setItem('alarmeC', JSON.stringify(dataC, null, '\t'));

        });
        navigator.notification.beep(1);
        cordova.plugins.backgroundMode.wakeUp();
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
        else data = [];
        return data;
    },

    //retourne le tableau des états des checkbox
    tableauC: function(){
        var dataC = localStorage.getItem('alarmeC');  
        if (dataC) {  
            dataC = JSON.parse(dataC);
        }
        else dataC = [];
        return dataC;
    },

};

app.initialize();

