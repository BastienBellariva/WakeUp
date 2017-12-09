var clicked = false;

//Initialisation
$(document).ready(function() {
	
});

//Affiche les boutons supprimer quand on clique sur "Modifier"
$("#divButtonUpdate").click(function() 
{
	if(clicked == false) 
	{
		$(".divActive").css("visibility", "hidden")
			$(".divHour").animate({marginLeft:100}, 200)
			$(".divAlarm").animate({marginLeft:-100}, 200, function()
			{
				$(".divDelete").css("visibility", "visible");
				$(".divDelete").animate({marginRight:100}, 500)
			});
		
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
	
		clicked = false
	}

	
  });

//Création de la div alarm
$(".divLibelleApp").click(function()
{
	//Div Alarm
	divAlarm = document.createElement("div");
	divAlarm.id = "divAlarmT";
	divAlarm.className = "divAlarm";

	//Input Hour
	divHour = document.createElement("input");
	divHour.id = "divHourT";
	divHour.className = "divHour col-xs-4 col-sm-4"

	//Toggle
	divActive = document.createElement("div");
	divActive.id = "divActiveT";
	divActive.className = "divActive col-xs-4 col-sm-4";

	//Constitution de l'image du toggle
	divOnOff = document.createElement("div");
	divOnOff.id = "onOff t";
	divOnOff.className = "onOff";

	labelSwitch = document.createElement("LABEL");
	labelSwitch.id = "switch t";
	labelSwitch.className = "switch";

	inputCheckbox = document.createElement("input");
	inputCheckbox.id = "inputCheckbox";

	spanSlider = document.createElement("span");
	spanSlider.className = "slider round";

	//Div Suppression
	divSuppr = document.createElement("button");
	divSuppr.className = "divDelete col-xs-4 col-sm-4";
	divSuppr.id = "divDelete t";
	divSuppr.textContent = "Suppr."

	//Assemblage/Paramétrage de la div
	document.getElementById("divAlarm2").after(divAlarm);
	document.getElementById("divAlarmT").prepend(divHour);
	document.getElementById("divHourT").setAttribute("value","14:00");
	document.getElementById("divHourT").after(divActive);
	document.getElementById("divActiveT").prepend(divOnOff);
	document.getElementById("onOff t").prepend(labelSwitch);
	document.getElementById("switch t").prepend(inputCheckbox);
	document.getElementById("inputCheckbox").setAttribute("type","checkbox");
	document.getElementById("inputCheckbox").after(spanSlider);
	document.getElementById("divActiveT").after(divSuppr);
	document.getElementById("divDelete t").setAttribute("type", "submit");
});