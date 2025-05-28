const imageBox = document.getElementById('imageBox');
const imageContainer = document.getElementById('imageContainer');
let selectedImage = null;
let isAdmin = false;



imageBox.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    document.querySelectorAll('.image-box img').forEach(img => img.classList.remove('selected'));
    e.target.classList.add('selected');
    selectedImage = e.target.src;
  }
});

function celebrate() {
  const name = document.getElementById('nameInput').value.trim();
  if (!name || !selectedImage) {
    alert('Please enter your name and select an image.');
    return;
  }

  const entry = { name, image: selectedImage };
  let entries = JSON.parse(localStorage.getItem('celebrations') || '[]');
  entries.push(entry);
  localStorage.setItem('celebrations', JSON.stringify(entries));
  displayEntries();
  document.getElementById('nameInput').value = '';
}

function getRandomXPosition() {
  return Math.floor(Math.random() * 90) + 5; // 5% to 95%
}

function displayEntries() {
  imageContainer.querySelectorAll('.celebration').forEach(el => el.remove());

  const entries = JSON.parse(localStorage.getItem('celebrations') || '[]');

  entries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'celebration';
    div.style.left = `${getRandomXPosition()}%`;
    div.style.bottom = `10px`;

    div.innerHTML = `
      <img src="${entry.image}" alt="">
      <p>${entry.name}</p>
      ${isAdmin ? `<button onclick="deleteEntry(${index})" class="delete-btn">❌</button>` : ''}
    `;

    imageContainer.appendChild(div);
  });
}

function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('celebrations') || '[]');
  entries.splice(index, 1);
  localStorage.setItem('celebrations', JSON.stringify(entries));
  displayEntries();
}

function toggleAdminMode() {
  if (!isAdmin) {
    const password = prompt("Enter admin password:");
    if (password !== 'sanlawon2025') {
      alert("Incorrect password!");
      return;
    }
  }

  isAdmin = !isAdmin;
  document.getElementById('adminToggleBtn').textContent = isAdmin
    ? 'Exit Admin Mode ❌'
    : 'Enter Admin Mode 🔐';
  displayEntries();
}

window.onload = displayEntries;
