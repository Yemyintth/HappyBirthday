
// set up text to print, each item in array is new line
var aText = new Array(
"<h1>Happy 24th Birthday</h1>",
"<h1> pr Ma Ma</h1>"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
 
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row
 
function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");
 
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br/>';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()", 500);
  }
 } else {
  setTimeout("typewriter()", iSpeed);
 }
}

function openMail() {
  document.getElementById("mail-icon").classList.add("hidden");
  document.getElementById("love-card").classList.remove("hidden");
}

function showCard(type) {
  document.getElementById("bouquote-card").classList.add("hidden");
  document.getElementById("game-card").classList.add("hidden");

  if (type === "bouquote") {
    document.getElementById("bouquote-card").classList.remove("hidden");
  } else if (type === "game") {
    document.getElementById("game-card").classList.remove("hidden");
  }
}

// Load counts from localStorage or start from 0
  let youLove = parseInt(localStorage.getItem("youCount")) || 0;
  let meLove = parseInt(localStorage.getItem("meCount")) || 0;

  updateDisplay();

  function addLove(who) {
    if (who === 'you') {
      youLove++;
      localStorage.setItem("youCount", youLove);
    } else if (who === 'me') {
      meLove++;
      localStorage.setItem("meCount", meLove);
    }
    updateDisplay();
  }

  function removeLove(who) {
    if (who === 'you' && youLove > 0) {
      youLove--;
      localStorage.setItem("youCount", youLove);
    } else if (who === 'me' && meLove > 0) {
      meLove--;
      localStorage.setItem("meCount", meLove);
    }
    updateDisplay();
  }

  function updateDisplay() {
    document.getElementById("youCount").innerText = youLove.toLocaleString();
    document.getElementById("meCount").innerText = meLove.toLocaleString();
  }


typewriter();
