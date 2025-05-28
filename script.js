const form = document.getElementById('wishForm');
const userNameInput = document.getElementById('userName');
const wishInput = document.getElementById('wishInput');
const messagesDiv = document.getElementById('messages');
const adminBtn = document.getElementById('adminBtn');
const logoutBtn = document.getElementById('logoutBtn');

let wishesArray = [];
let isAdmin = false;

// set up text to print, each item in array is new line
var aText = new Array(
"<h1>Wishes for San La Won</h1>",
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
 
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row
 

function addWishCard(user, text, index) {
  const card = document.createElement('div');
  card.className = 'wish-card';
  card.innerHTML = `
    <p>“${text}”</p>
    <div class="user">— from ${user || 'Anonymous'}</div>
  `;

  if (isAdmin) {
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌ Delete';
    delBtn.style.cssText = 'position:absolute; top:10px; right:10px; background:#ff5e89; border:none; color:white; padding:6px 10px; border-radius:12px; cursor:pointer;';
    delBtn.onclick = () => {
      wishesArray.splice(index, 1);
      saveWishes();
      renderWishes();
    };
    card.appendChild(delBtn);
  }

  messagesDiv.prepend(card);
}

function saveWishes() {
  localStorage.setItem('birthdayWishes', JSON.stringify(wishesArray));
}

function loadWishes() {
  const saved = localStorage.getItem('birthdayWishes');
  if (saved) {
    wishesArray = JSON.parse(saved);
    renderWishes();
  }
}

function renderWishes() {
  messagesDiv.innerHTML = '';
  wishesArray.forEach((wish, index) => addWishCard(wish.user, wish.text, index));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const user = userNameInput.value.trim();
  const text = wishInput.value.trim();
  if (!text) return;
  wishesArray.push({ user, text });
  saveWishes();
  renderWishes();
  userNameInput.value = '';
  wishInput.value = '';
});

adminBtn.addEventListener('click', () => {
  const pwd = prompt('Enter admin password:');
  if (pwd === 'sanlawon2025') {
    isAdmin = true;
    adminBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    renderWishes();
    alert('Admin mode activated.');
  } else {
    alert('Incorrect password!');
  }
});

logoutBtn.addEventListener('click', () => {
  isAdmin = false;
  logoutBtn.style.display = 'none';
  adminBtn.style.display = 'inline-block';
  renderWishes();
});

function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");
 
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br/>';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "";
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


typewriter();
loadWishes();
