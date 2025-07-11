// initialize the countdown variable to null so that it can be used to store the interval ID for the countdown (the unique ID for when we use setInterval() to start a countdown later in the code)
let countdown = null;

function setAlarm() {
  // stop a countdown if one has already started
  if (countdown) {
    // uses the unique ID stored in the countdown variable to stop the countdown
    clearInterval(countdown);
    // clear the variable so that it can be reused
    countdown = null;
  }
  // set the background colour of the page to white
  document.body.style.backgroundColor = "white";

  // access the value from the input field a
  const input = document.querySelector("#alarmSet");

  // parse the value from the input field as an integer to prevent errors when the user enters a string or a decimal number
  const timeInSeconds = parseInt(input.value, 10);

  // check for invalid inputs and update the <h1> element with an error message if the input is invalid
  if (!Number.isInteger(timeInSeconds) || timeInSeconds < 0) {
    alert("Please enter a valid number of seconds!");
    return; // stop the code if the input is invalid
  }
  // if the input is valid and the time is zero, update the <h1> element with "Time Remaining: 00:00", play the alarm sound, and set the background to red
  if (timeInSeconds === 0) {
    playAlarm();
    document.body.style.backgroundColor = "red";
    return;
  }

  // format the input into minutes and seconds MM:SS
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
  const display = `Time Remaining: ${minutes}:${seconds}`;

  // when the user clicks the set alarm button the countdown display in <h1> should update to show the value of the input in MM:SS format.
  document.querySelector("#timeRemaining").innerText = display;

  // set a new variable to hold the time in seconds value from th input.
  // create a countdown function using setInterval() that takes a callback function and a time in milliseconds (1000ms = 1 second)
  // the callback function checks that if there is any value in teh input greater than 0, if there is then decrease that value by 1 every second
  // if the value reaches zero (which is the "else" condition) then stop the countdown using clearInterval() and play the alarm sound.
  let time = timeInSeconds;
  countdown = setInterval(() => {
    if (time > 0) {
      time -= 1; // decrease the time by 1 every second
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0"); // calculate the minutes and format it to 2 digits
      const seconds = (time % 60).toString().padStart(2, "0"); // calculate the seconds and format it to 2 digits
      const display = `Time Remaining: ${minutes}:${seconds}`; // format the display in MM:SS
      document.getElementById("timeRemaining").innerText = display; // update the <h1> element with the new display
    } else {
      // if the time is zero stop the countdown
      clearInterval(countdown);
      countdown = null;
      // play the alarm sound
      playAlarm();
      // update the <h1> element with "Time Remaining: 00:00"
      document.getElementById("timeRemaining").innerText =
        "Time Remaining: 00:00";
      // set the background colour of the page to red
      document.body.style.backgroundColor = "red";
    }
  }, 1000);
}

// DO NOT EDIT BELOW HERE

var audio = new Audio("alarmsound.mp3");

function setup() {
  document.getElementById("set").addEventListener("click", () => {
    setAlarm();
  });

  document.getElementById("stop").addEventListener("click", () => {
    pauseAlarm();
  });
}

function playAlarm() {
  audio.play();
}

function pauseAlarm() {
  audio.pause();
}

window.onload = setup;
