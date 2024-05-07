// JavaScript

// Globala variabler
let wordList;
let selectedWord;
let letterBoxes;
let hangmanImg;
let hangmanImgNr;
let msgElem;
let letterButtons;

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	
	wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
				"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
				"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];

	let i;
	let startGameBtn =  document.getElementById("startGameBtn");
	startGameBtn.addEventListener("click", event=>{
		startGame();
	})

	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
	for(i=0; i<letterButtons.length; i++) letterButtons[i].onclick = guessLetter;
	hangmanImg = document.getElementById("hangman");
    msgElem = document.getElementById("message");
} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

function randomWord(){
	let randomIndex = Math.floor(Math.random() * wordList.length);
	console.log(randomIndex);
	selectedWord = wordList[randomIndex];
console.log(selectedWord);
	return selectedWord;
}

function startGame(){
	//startar när man klickar på knappen "startGame"
	//anropar randomWord
	//anropar ShowLetterBox
	//visa första bilden
	randomWord();
	showLetterBox();
	console.log(selectedWord.length);
	hangmanImg.src = "pics/h0.png"
	hangmanImgNr = 0;
}

function showLetterBox() {
    // Lokala variabler
    let newCode = ""; // En textsträng med HTML-koden för bokstavsrutorna
    let i; // Loopvariabel

    for (i = 0; i < selectedWord.length; i++) {
        newCode += "<span>&nbsp;</span> "; 
    }

    document.getElementById("letterBoxes").innerHTML = newCode;


    letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}


function guessLetter() {
    // Lokala variabler
    let letter = this.value; 
    let i; // Loopvariabel
    let letterFound = false; 
    let correctLettersCount = 0;
for (i = 0; i < selectedWord.length; i++) {
   
    if (letter === selectedWord[i]) {
        correctLettersCount++;
        letterFound = true;
        letterBoxes[i].innerHTML = letter;
    }
}
    if (!letterFound) {
        hangmanImgNr++; // Räkna upp hangmanImgNr
        hangmanImg.src = "pics/h" + hangmanImgNr + ".png";


        if (hangmanImgNr === 6) {
            endGame(true);
        }
    }

    
    if (correctLettersCount === selectedWord.length) {
        endGame(false);
    }
}

function endGame(manHanged) {
    if (manHanged) {
		
        msgElem.textContent = "Tyvärr, gubben hängdes. Det rätta ordet var: " + selectedWord;
    } else {
        msgElem.textContent = "Grattis! Du klarade hela ordet!";
    }
}