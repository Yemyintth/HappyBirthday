function goBack() {
    window.location.href = 'index.html';
  }
  
  // Load cake image
  document.getElementById('mainCake').src = 'images/cake.gif'; // Update if needed
  
  const sliceBtn = document.getElementById('sliceBtn');
  const slicesContainer = document.getElementById('slicesContainer');
  
  let sliceCount = 0;
  const maxSlices = 8;
  
  sliceBtn.addEventListener('click', () => {
    if (sliceCount >= maxSlices) {
      alert("🎂 All slices served! No more cake left.");
      return;
    }
  
    const slice = document.createElement('img');
    slice.src = 'images/cake-slice.gif'; // Update if needed
    slice.className = 'slice';
    slicesContainer.appendChild(slice);
    sliceCount++;
  });

  function selectDrink(type) {
    const drinkImage = document.getElementById("drinkImage");
    switch (type) {
      case "coffee":
        drinkImage.src = "images/coffee.webp";
        break;
      case "orange":
        drinkImage.src = "images/orange.jpg";
        break;
      case "milk":
        drinkImage.src = "images/milk.webp";
        break;
      case "cola":
        drinkImage.src = "images/cola.jpg";
        break;
      default:
        drinkImage.src = "images/choose.png";
    }
  }
  