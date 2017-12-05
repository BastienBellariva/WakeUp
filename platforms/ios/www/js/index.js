

$("#test").click(function(){
<<<<<<< HEAD
    app.test();
=======
    app.ajout(258665);
    app.supprimer(0);
    //https://cordova.apache.org/docs/fr/latest/cordova/storage/localstorage/localstorage.html
>>>>>>> 8c0d2be20624b8568bb953b04c42e951dc38f37f
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
<<<<<<< HEAD
        console.log(cordova.file);
        //alert(date);
        //setInterval(this.alarm);
=======
        alert(date);
        //setInterval(this.alarm, 1000);
>>>>>>> 8c0d2be20624b8568bb953b04c42e951dc38f37f
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

<<<<<<< HEAD
    date: function(){
=======
    date: function(date){       // recupere la date sous format jour jour mois annee
>>>>>>> 8c0d2be20624b8568bb953b04c42e951dc38f37f
        // les noms de jours / mois
        var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
        var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
        // on recupere la date
<<<<<<< HEAD
        var date = new Date();
=======
        if (!date) {var date = new Date();}
>>>>>>> 8c0d2be20624b8568bb953b04c42e951dc38f37f
        // on construit le message
        var message = jours[date.getDay()] + " ";   // nom du jour
        message += date.getDate() + " ";   // numero du jour
        message += mois[date.getMonth()] + " ";   // mois
        message += date.getFullYear();
        return message;
    },

<<<<<<< HEAD
    heure: function(){
         var date = new Date();
=======
    heure: function(date){      // recupere la date sous format heure minute
         if (!date) {var date = new Date();}
>>>>>>> 8c0d2be20624b8568bb953b04c42e951dc38f37f
         var heure = date.getHours();
         var minutes = date.getMinutes();
         if(minutes < 10)
              minutes = "0" + minutes;
         if (heure < 10)
              heure = "0" + heure;  
         return heure + "h" + minutes;
    },

<<<<<<< HEAD
    alarm: function(){

    },

    test: function(){
    	var jsonArray = {"name": "Chris", "age": "38"};
		var myJsonString = JSON.stringify(jsonArray);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

	    	console.log('file system open: ' + fs.name);
	    	fs.root.getFile("test.json", { create: true, exclusive: false }, function (fileEntry) {

	        	console.log("fileEntry is file?" + fileEntry.isFile.toString());
	        	fileEntry.name == 'test.json';
	        	fileEntry.fullPath == 'C:/test.json'
	        	app.writeFile(fileEntry, null);

	    	});

		});
	},

	writeFile: function(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            app.readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
	},

	readFile: function(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            //	displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    });
	},
=======
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
>>>>>>> 8c0d2be20624b8568bb953b04c42e951dc38f37f

};

app.initialize();