const images = [
  "./assets/cute-cat-a.png",
  "./assets/cute-cat-b.jpg",
  "./assets/cute-cat-c.jpg",
];

// Write your code here

// update the <p> element to display the image and counter
function updateDisplay() {
  // set initial image to index 0 when page loads
  slideImage.src = images[currentImageIndex];

  // update the image number display
  const imageCounter = (document.querySelector("p").textContent = `Image ${
    currentImageIndex + 1
  } of ${images.length}`);
}

// get the image and button elements from the DOM
const slideImage = document.querySelector("#carousel-img");
const forwardButton = document.querySelector("#forward-btn");
const backButton = document.querySelector("#backward-btn");
const autoForwardBtn = document.querySelector("#auto-forward");
const autoBackBtn = document.querySelector("#auto-backward");
const stopButton = document.querySelector("#stop");

// track the current image index
let currentImageIndex = 0;

// call the updateDisplay function to show the first image and counter when the page loads
updateDisplay();

// add event listener to the forward button so that when it is clicked the image changes to the next image in the array
forwardButton.addEventListener("click", () => {
  // when th button is clicked increment the image index so it moves to the next image - use the modulo operator to automatically wrap around the array when currentImageIndex reaches the end (instead of using the if statement approach)

  /*
     for example:
    - image at index 0, goes to index 1
    currentImageIndex = (0 + 1) % 3 = 1 % 3 = 1 

    - image at index 1, goes to index 2
    currentImageIndex = (1 + 1) % 3 = 2 % 3 = 2  

    - image at index 2, goes to index 0 (wraps back to the beginning)
    currentImageIndex = (2 + 1) % 3 = 3 % 3 = 0  
     */
  currentImageIndex = (currentImageIndex + 1) % images.length;

  // update the image number display
  updateDisplay();
});

// add event listener to the back button so that when it is clicked the image changes to the previous image in the array
backButton.addEventListener("click", () => {
  // when the back button is clicked decrement the image index so it moves to the previous image - use the modulo operator to automatically wrap around the array when currentImageIndex reaches the beginning (instead of using the if statement approach)

  /*
        for example:
        - image at index 2, goes to index 1
        currentImageIndex = (2 - 1 + 3) % 3 = 4 % 3 = 1

        - image at index 1, goes to index 0
        currentImageIndex = (1 - 1 + 3) % 3 = 3 % 3 = 0

        - image at index 0, goes to index 2 (wraps to the end)
        currentImageIndex = (0 - 1 + 3) % 3 = 2 % 3 = 2
        */
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;

  // update the image number display
  updateDisplay();
});

// declare a variable to store the timer ID that setInterval() method uses for the auto-forward and auto-backward functionality so that we can clear it later when the stop button is clicked
let autoTimer = null;

// when the user clicks an 'auto' button disable both the 'auto' buttons, then use the autoTimer variable and assign the setInterval() method with the forward button logic to automatically move the image forward every 2 seconds when the auto-forward button is clicked
autoForwardBtn.addEventListener("click", () => {
  // clear any existing autoTimer IDs
  clearInterval(autoTimer);

  // disable both the auto buttons when the autoForwardBtn is clicked (as per the test cases)
  autoForwardBtn.disabled = true;
  autoBackBtn.disabled = true;

  autoTimer = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateDisplay();
  }, 2000);
});

// when the user clicks an 'auto' button disable both the 'auto' buttons, then use the autoTimer variable and assign the setInterval() method with the back button logic to automatically move the image backward every 2 seconds when the auto-backward button is clicked
autoBackBtn.addEventListener("click", () => {
  // clear any existing autoTimer IDs
  clearInterval(autoTimer);

  // disable both the auto buttons when the autoForwardBtn is clicked (as per the test cases)
  autoForwardBtn.disabled = true;
  autoBackBtn.disabled = true;

  autoTimer = setInterval(() => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateDisplay();
  }, 2000);
});

stopButton.addEventListener("click", () => {
  // clear the autoTimer ID to stop the automatic image movement
  clearInterval(autoTimer);

  // re-enable both the auto buttons when the stop button is clicked
  autoForwardBtn.disabled = false;
  autoBackBtn.disabled = false;
});
