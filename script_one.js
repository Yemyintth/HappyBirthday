
// set up text to print, each item in array is new line
var aText = new Array(
"<h1>Birthday Party Of</h1>",
"<h1>San La Won</h1>"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
 
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

const countdownEl = document.getElementById('countdown');
const messageEl = document.getElementById('birthdayMessage');

 
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

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthday = new Date(currentYear, 4, 29); // May = 4 (zero-based)

    if (now > birthday) {
      birthday = new Date(currentYear + 1, 4, 29);
    }

    const diff = birthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const isTodayBirthday = now.getDate() === 29 && now.getMonth() === 4;

    if (isTodayBirthday) {
      countdownEl.style.display = 'none';
      messageEl.style.display = 'block';
    } else {
      countdownEl.innerHTML = `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
      messageEl.style.display = 'none';
    }
  }
function checkPrivateAccess() {
    const password = prompt("Enter the password to access the private page:");
    if (password === "sanlawon2025") {
      window.location.href = "private.html";
    } else if (password !== null) {
      alert("Incorrect password. Try again!");
    }
  }

typewriter();
updateCountdown();
setInterval(updateCountdown, 1000);