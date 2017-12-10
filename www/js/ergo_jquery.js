var clicked = false;

//Initialisation
//Affichage des différentes alarmes
$(document).ready(function() {
	affichageAlarme();
});

//Affiche les boutons supprimer quand on clique sur "Modifier"
$("#divButtonUpdate").click(function() 
{
	affichageButtonSupprimer(false);
  });

//Création de la div alarm
$("#buttonAdd").click(function()
{
	//Création de la nouvelle alarme dans la base de données 
	affichageButtonSupprimer(true,
		creationAlarme(app.nextIndex(), "00:00",
			app.ajout()
		)
	);
});

//Gere l'affichage du bouton Suppr.
affichageButtonSupprimer = function(etat){
	if (etat) {
		SupprVisible();
		clicked = true;
	}
	else if((clicked == false)) 
	{
		$(".divActive").css("visibility", "hidden")
		$(".divHour").animate({marginLeft:100}, 200)
		$(".divAlarm").animate({marginLeft:-100}, 200, function()
			{
				$(".divDelete").css("visibility", "visible");
				$(".divDelete").animate({marginRight:100}, 500);
			});
		$(".divHour").prop('disabled', false);
		clicked = true
	} 
	else 
	{
		$(".divDelete").animate({marginRight:0}, 500, function()
		{
			$(".divDelete").css("visibility", "hidden")
			$(".divHour").animate({marginLeft:0}, 200);
			$(".divAlarm").animate({marginLeft:0}, 200);
			$(".divActive").css("visibility", "visible");	
		});
		$(".divHour").prop('disabled', true);
		clicked = false
	}
};

//Creation d'une nouvelle div alarme
creationAlarme = function(index, valeur, checked){
	//Div Alarm
	divAlarm = document.createElement("div");
	divAlarm.id = "divAlarmT" + index;
	divAlarm.className = "divAlarm";

	//Input Hour
	divHour = document.createElement("input");
	divHour.id = "divHourT" + index;
	divHour.className = "divHour col-xs-4 col-sm-4"

	//Toggle
	divActive = document.createElement("div");
	divActive.id = "divActiveT"  + index;
	divActive.className = "divActive col-xs-4 col-sm-4";

	//Constitution de l'image du toggle
	divOnOff = document.createElement("div");
	divOnOff.id = "onOff t" + index;
	divOnOff.className = "onOff";

	labelSwitch = document.createElement("LABEL");
	labelSwitch.id = "switch t" + index;
	labelSwitch.className = "switch";

	inputCheckbox = document.createElement("input");
	inputCheckbox.id = "inputCheckbox" + index;
	if (checked) inputCheckbox.checked = true;

	spanSlider = document.createElement("span");
	spanSlider.className = "slider round";

	//Div Suppression
	divSuppr = document.createElement("button");
	divSuppr.className = "divDelete col-xs-4 col-sm-4";
	divSuppr.id = "divDelete t" + index;
	divSuppr.textContent = "Suppr."

	//Assemblage/Paramétrage de la div
	document.getElementById("containDivAlarm").appendChild(divAlarm);
	document.getElementById("divAlarmT"+ index).prepend(divHour);
	document.getElementById("divHourT" + index).setAttribute("value", valeur);
	document.getElementById("divHourT" + index).setAttribute("type","time");
	document.getElementById("divHourT" + index).setAttribute("disabled","disabled");
	document.getElementById("divHourT" + index).after(divActive);
	document.getElementById("divHourT" + index).onchange = function(){app.modifier(index, "divHourT" + index )};
	document.getElementById("divActiveT"  + index).prepend(divOnOff);
	document.getElementById("onOff t"  + index).prepend(labelSwitch);
	document.getElementById("switch t"  + index).prepend(inputCheckbox);
	document.getElementById("inputCheckbox"  + index).setAttribute("type","checkbox");
	document.getElementById("inputCheckbox"  + index).after(spanSlider);
	document.getElementById("inputCheckbox"  + index).onclick = function(){app.modifierC(index)};
	document.getElementById("divActiveT"  + index).after(divSuppr);
	document.getElementById("divDelete t"  + index).setAttribute("type", "submit");
	document.getElementById("divDelete t"  + index).onclick = function(){
		SupprVisible(
			affichageAlarme(
				actualiser(
					app.supprimer(index)
				)
			)
		)
	};
};

//Affiche les divs alarme
affichageAlarme = function() {
	var i = 0;
	tableauC = app.tableauC();
	app.tableauAlarme().forEach(function(element) {
		creationAlarme(i, element, tableauC[i]);
		i++;
	});
};

//Rend le bouton Suppr. visible sans animation
SupprVisible = function() {
	$(".divActive").css("visibility", "hidden");
	$(".divDelete").css("visibility", "visible");
	$(".divDelete").css("marginLeft", 500);
	$(".divDelete").css("marginRight", 100);
	$(".divHour").prop('disabled', false);
};

//efface toutes les divs alarme
actualiser = function() {
	$(".containDivAlarm").empty();
};
