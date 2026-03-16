let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)

var backgroundImages = [
    "image1.jpeg"
    // Add more image URLs as needed
  ];

  // Get a random index from the array
  var randomIndex = Math.floor(Math.random() * backgroundImages.length);

  // Set the background image URL
  var backgroundContainer = document.getElementById("background-container");
  backgroundContainer.style.backgroundImage = "url(" + backgroundImages[randomIndex] + ")";