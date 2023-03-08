//invocata quando non si ottiene una corrispondenza perfetta matriceScelte - modellini
function modellinoRandom (min, max) {
	try {
		var indiceRandom = Math.floor(Math.random() * (max - min + 1)) + min;
		if (indiceRandom == 1) {
			var risultatoRandom = document.getElementById("coober").style.display = "block";
			var testoRandom = document.getElementById("testoCoober").style.display = "block";
		} else if (indiceRandom == 2) {
			var risultatoRandom = document.getElementById("laputa").style.display = "block";
			var testoRandom = document.getElementById("testoLaputa").style.display = "block";
		} else if (indiceRandom == 3) {
			var risultatoRandom = document.getElementById("hobbiton").style.display = "block";
			var testoRandom = document.getElementById("testoHobbiton").style.display = "block";
		} else if (indiceRandom == 4) {
			var risultatoRandom = document.getElementById("artistica").style.display = "block";
			var testoRandom = document.getElementById("testoArtistica").style.display = "block";
		} else if (indiceRandom == 5) {
			var risultatoRandom = document.getElementById("medusa").style.display = "block";
			var testoRandom = document.getElementById("testoMedusa").style.display = "block";
		} else {
			scriviMessaggio(nodoMessaggioRandom, "Ops, qualcosa è andato storto. Premere AZZERA per ricominciare.");
		}
		return risultatoRandom.innerHTML + testoRandom.innerHTML;
	} catch ( e ) {
		alert ("modellinoRandom " + e);
	}
}
//invocata quando l'utente commette un "errore" nel drag and drop: appare un messaggio su schermo, sotto gli elementi del drag
function scriviMessaggio (nodo, messaggio) {
	nodo.firstChild.nodeValue = messaggio;
}
//invocata quando l'utente preme SCOPRI
function gestoreInizia () {
		document.getElementById("formDragDrop").scrollIntoView();
}
//invocata quando l'utente preme il pulsante AZZERA
function gestoreAzzera () {
	try {
		window.location.reload();
	} catch ( e ) {
		alert("gestoreAzzera " + e);
	}
}
//invocata quando l'utente seleziona l'immagine e inizia a spostarla
function gestoreDragStart (evento) {
	try {
		scriviMessaggio(nodoMessaggioErrore, "");
		evento.dataTransfer.setData("text", this.id);
	} catch ( e ) {
		alert("gestoreDragStart " + e);
	}
}
//invocata quando l'utente sposta l'immagine sul rettangolo
function gestoreDragOver (evento) {
	try {
		event.preventDefault();
	} catch ( e ) {
		alert("gestoreDragOver " + e);
	}
}
//gestisce le scelte effettuate dall'utente. Alcune si contraddicono e non possono essere scelte insieme
function gestoreScelte (dati){
		try {
			if (dati == "città") {
				for (var i = 0; i < matriceScelte.length; i++){
					if (matriceScelte[i] == "villaggio") {
						scriviMessaggio(nodoMessaggioErrore, "Se è un villaggio non può essere una città");
						return false;
					}
				}
			} else if (dati == "villaggio") {
				for (var i = 0; i < matriceScelte.length; i++){
					if (matriceScelte[i] == "città") {
						scriviMessaggio(nodoMessaggioErrore, "Se è una città non può essere un villaggio");
						return false;
					}
				}
			} else if (dati == "robot" || dati == "tecnologia") {
				for (var i = 0; i < matriceScelte.length; i++){
					if (matriceScelte[i] == "artigianato" || matriceScelte[i] == "agricoltura") {
						scriviMessaggio(nodoMessaggioErrore, "Se è basata su agricoltura/artigianato non può essere basata sulla tecnologia/robotica");
						return false;
					}
				}
			} else if (dati == "agricoltura" || dati == "artigianato") {
				for (var i = 0; i < matriceScelte.length; i++){
					if (matriceScelte[i] == "robot" || matriceScelte[i] == "tecnologia") {
						scriviMessaggio(nodoMessaggioErrore, "Se è basata sulla robotica/tecnologia non può essere basata su agricoltura/artigianato");
						return false;
					}
				}
			} else if (dati == "visionaria") {
				for (var i = 0; i < matriceScelte.length; i++){
					if (matriceScelte[i] == "pratica") {
						scriviMessaggio(nodoMessaggioErrore, "Se è pratica non può essere visionaria");
						return false;
					}
				}
			} else if (dati == "pratica") {
				for (var i = 0; i < matriceScelte.length; i++){
					if (matriceScelte[i] == "visionaria") {
						scriviMessaggio(nodoMessaggioErrore, "Se è visionaria non può essere pratica");
						return false;
					}
				}
			}
		} catch ( e ) {
			alert("gestoreScelte " + e);
		}
}

//invocata quando l'utente rilascia l'immagine all'interno del rettangolo
function gestoreDrop (evento) {
	try {
		if (matriceScelte.length < 3) {
			evento.preventDefault();
			var dati = evento.dataTransfer.getData("text");
			gestoreScelte(dati);
			this.appendChild(document.getElementById(dati));
			//così aggiungo la scelta alla matrice:
			matriceScelte[matriceScelte.length] = dati;
			/*se son state scelte due opzioni contradditorie 
			l'ultima viene rimossa dall'array:*/
			if (gestoreScelte(dati) == false) {
				matriceScelte.pop();
				this.removeChild(document.getElementById(dati));
			}
		} else {
			scriviMessaggio(nodoMessaggioErrore, "Per ottenere un profilo adeguato è necessario scegliere tre caratteristiche");
		}
	} catch ( e ) {
		alert("gestoreDrop " + e);
	}
}
//usata per cambiare il cursore quando passa sopra i testi da spostare o i pulsanti
function gestoreCursore () {
	try {
		nodoRobot.style.cursor = "pointer";
		nodoVillaggio.style.cursor = "pointer";
		nodoVisionaria.style.cursor = "pointer";
		nodoArtigianato.style.cursor = "pointer";
		nodoTecnologia.style.cursor = "pointer";
		nodoCitta.style.cursor = "pointer";
		nodoAgricoltura.style.cursor = "pointer";
		nodoPratica.style.cursor = "pointer";
		nodoArte.style.cursor = "pointer";
		nodoFatto.style.cursor = "pointer";
		nodoAzzera.style.cursor = "pointer";
		nodoInizia.style.cursor = "pointer";
	} catch ( e ) {
		alert("gestoreCursore " + e);
	}
}
//controlla se matriceScelte corrisponde ad un modellino precostruito
function controlloImmagineCitta (modello) {
	try {
			var c = 0;
			for (var i = 0; i < matriceScelte.length; i++) {
				for (var j = 0; j < matriceScelte.length; j++) {
					if (matriceScelte[i] == modello[j]) {
						c++;
					}
				}
			}
			if (c == 3) {
				return true; 
			} else {
				return false;
			}
	} catch ( e ) {
		alert ("controlloImmagineCitta " + e);
	}
}
//restituisce il modellino (sia con corrispondenza esatta che non) 
function creaModellino () {
	try {
			if (matriceScelte.length == 3) {
				document.getElementById("formRisultato").scrollIntoView();
				document.getElementById("fatto").style.display = "none";
				if (controlloImmagineCitta(MODELLO_COOBER)) {
					var risultato = document.getElementById("coober").style.display = "block";
					var testo = document.getElementById("testoCoober").style.display = "block";
					return risultato.innerHTML + testo.innerHTML;
				} else if (controlloImmagineCitta(MODELLO_LAPUTA)) {
					var risultato = document.getElementById("laputa").style.display = "block";
					var testo = document.getElementById("testoLaputa").style.display = "block";
					return risultato.innerHTML + testo.innerHTML;
				} else if (controlloImmagineCitta(MODELLO_HOBBITON)) {
					var risultato = document.getElementById("hobbiton").style.display = "block";
					var testo = document.getElementById("testoHobbiton").style.display = "block";
					return risultato.innerHTML + testo.innerHTML;
				} else if (controlloImmagineCitta(MODELLO_ARTISTICA)) {
					var risultato = document.getElementById("artistica").style.display = "block";
					var testo = document.getElementById("testoArtistica").style.display = "block";
					return risultato.innerHTML + testo.innerHTML;
				} else if (controlloImmagineCitta(MODELLO_MEDUSA)) {
					var risultato = document.getElementById("medusa").style.display = "block";
					var testo = document.getElementById("testoMedusa").style.display = "block";
					return risultato.innerHTML + testo.innerHTML;
				} else {
					scriviMessaggio(nodoMessaggioRandom, "Non ci sono corrispondenze esatte. Il risultato sarà casuale:");
					document.getElementById("fatto").style.display = "none";
					modellinoRandom(1, 5);
				}
		} else if (matriceScelte.length < 3) {
			scriviMessaggio(nodoMessaggioErrore, "Per ottenere un profilo adeguato è necessario scegliere tre caratteristiche");
		}
	} catch ( e ) {
		alert ("creaModellino " + e);
	}
}

var nodoFatto;
var nodoAzzera;
var nodoInizia;

var nodoRettangolo;
var nodoRobot;
var nodoVillaggio;
var nodoVisionaria;
var nodoArtigianato;
var nodoTecnologia;
var nodoCitta;
var nodoAgricoltura;
var nodoPratica;
var nodoArte;

var nodoMessaggioErrore;
var nodoMessaggioRandom;
var nodoAnnoRisultato;
var nodoTestoRisultato;

var matriceScelte;

function gestoreLoad () {
	try {
		nodoFatto = document.getElementById("fatto");
		nodoAzzera = document.getElementById("azzera");
		nodoInizia = document.getElementById("inizia");
		nodoRettangolo = document.getElementById("rettangolo");
		nodoRobot = document.getElementById("robot");
		nodoVillaggio = document.getElementById("villaggio");
		nodoVisionaria = document.getElementById("visionaria");
		nodoArtigianato = document.getElementById("artigianato");
		nodoTecnologia = document.getElementById("tecnologia");
		nodoCitta = document.getElementById("città");
		nodoAgricoltura = document.getElementById("agricoltura");
		nodoPratica = document.getElementById("pratica");
		nodoArte = document.getElementById("arte");
		
		nodoFatto.addEventListener("click", creaModellino);
		nodoAzzera.onclick = gestoreAzzera;
		nodoInizia.addEventListener("click", gestoreInizia);
		
		nodoRettangolo.ondragover = gestoreDragOver;
		nodoRettangolo.ondrop = gestoreDrop;
		
		nodoRobot.ondragstart = gestoreDragStart;
		nodoRobot.onmouseover = gestoreCursore;
		nodoVillaggio.ondragstart = gestoreDragStart;
		nodoVillaggio.onmouseover = gestoreCursore;
		nodoVisionaria.ondragstart = gestoreDragStart;
		nodoVisionaria.onmouseover = gestoreCursore;
		nodoArtigianato.ondragstart = gestoreDragStart;
		nodoArtigianato.onmouseover = gestoreCursore;
		nodoTecnologia.ondragstart = gestoreDragStart;
		nodoTecnologia.onmouseover = gestoreCursore;
		nodoCitta.ondragstart = gestoreDragStart;
		nodoCitta.onmouseover = gestoreCursore;
		nodoAgricoltura.ondragstart = gestoreDragStart;
		nodoAgricoltura.onmouseover = gestoreCursore;
		nodoPratica.ondragstart = gestoreDragStart;
		nodoPratica.onmouseover = gestoreCursore;
		nodoArte.ondragstart = gestoreDragStart;
		nodoArte.onmouseover = gestoreCursore;
		
		matriceScelte = [];
		
		nodoMessaggioErrore = document.getElementById("messaggioErrore");
		var nodoTesto = document.createTextNode("");
		nodoMessaggioErrore.appendChild(nodoTesto);
		nodoMessaggioRandom = document.getElementById("messaggioRandom");
		var nodoTesto2 = document.createTextNode("");
		nodoMessaggioRandom.appendChild(nodoTesto2);
	} catch ( e ) {
		alert("gestoreLoad " + e);
	}
}
window.onload = gestoreLoad;

const MODELLO_LAPUTA = ['robot', 'visionaria', 'città'];
const MODELLO_HOBBITON = ["villaggio", "agricoltura", "artigianato"];
const MODELLO_COOBER = ["città", "pratica", "artigianato"];
const MODELLO_ARTISTICA = ["arte", "città", "visionaria"];
const MODELLO_MEDUSA = ["città", "pratica", "tecnologia"];