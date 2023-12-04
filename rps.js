// Programmer: Jake Isom
// Class: SD 230 OL
// Date: 10/05/2023
// Assignment: Project 1: Interim Progress #2 Rock Paper Scissors 
// Reference Material: SD weeks 1-7 canvas material, and assignment specifications
// Purpose: To get experience using methods and problem solving in JavaScript

document.addEventListener("DOMContentLoaded", function() {
//waiting for the document object model to fully load in before executing the code
  const choiceButtons = document.querySelectorAll(".choice-button");
  const playButton = document.getElementById("play-button");
  const playAgainButton = document.getElementById("play-again-button");
  const viewResultsButton = document.getElementById("view-results-button");
  const startNewGameButton = document.getElementById("start-new-game-button");
  const returnToGameButton = document.getElementById("return-to-game-button");
  const startButton = document.getElementById("start-button");
  //defining constant variables for the elements that will be used in game
  const resultMessage = document.getElementById("result-message");
  const userChoiceDisplay = document.getElementById("user-choice-display");
  const computerChoiceDisplay = document.getElementById("computer-choice-display");
  const userWinCount = document.getElementById("user-win-count");
  const computerWinCount = document.getElementById("computer-win-count");
  const drawCount = document.getElementById("draw-count");
  const gameScreen = document.querySelector(".game-screen");
  const resultScreen = document.querySelector(".result-screen");
  const resultsScreen = document.querySelector(".results-screen");
  const alternateScreen = document.querySelector(".alternate-screen");
  //this will go for elements used in HTML and styled in css to form the GUI

  let userChoice = null;
  let computerChoice = null;
  let userWins = 0;
  let computerWins = 0;
  let draws = 0;
  //init game counters, and variables to track the game

  function resetGame() {
    userChoice = null;
    computerChoice = null;
    userChoiceDisplay.innerHTML = "";
    computerChoiceDisplay.innerHTML = "";
    resultMessage.textContent = "";
    playAgainButton.disabled = true;
    //function to reset the game, blanked out saved data and starts again

    choiceButtons.forEach(btn => {//even listener to see if user is clicking or hovering
      btn.classList.remove("selected");
      btn.style.removeProperty("background-color");
      btn.style.removeProperty("color");
      btn.style.removeProperty("transform");
    });//qualities for each button when clicked or hovered
  }

  
  choiceButtons.forEach(choiceButton => {
    choiceButton.addEventListener("mouseenter", function() {
      //for each button it is watching to see if the mouse goes over (hovers)
      if (!choiceButton.classList.contains("selected")) {
        choiceButton.style.transform = "scale(1.2)";
      }//if hovered it will increase by 1.2 as shown in css
    });

    choiceButton.addEventListener("mouseleave", function() {
      //reset the button size after hover
      if (!choiceButton.classList.contains("selected")) {
        choiceButton.style.transform = "scale(1)";
      }//return to original size when no longer being hovered
    });

    choiceButton.addEventListener("click", function() {
      //click to select a choice
      if (userChoice == choiceButton.id) {
        //unclick if already selected
        userChoice = null;
        choiceButton.classList.remove("selected");
        choiceButton.style.removeProperty("background-color");
        choiceButton.style.removeProperty("color");
        choiceButton.style.removeProperty("transform");
      } else {
        //click to select a choice
        userChoice = choiceButton.id;
        //reset other buttons' appearance
        choiceButtons.forEach(btn => {
          btn.classList.remove("selected");
          btn.style.removeProperty("background-color");
          btn.style.removeProperty("color");
          btn.style.removeProperty("transform");
        });
        //highlight the selected button to enhance user experience
        choiceButton.classList.add("selected");
        choiceButton.style.backgroundColor = "gold";
        choiceButton.style.color = "white";
        choiceButton.style.transform = "scale(1.2)";
      }
    });
  });

  playButton.addEventListener("click", function() {
    if (!userChoice) {
      alert("Please select a move.");
      return;
    }//event listener for the Play button

    computerChoice = getRandomChoice();
    //get the computer's choice

    userChoiceDisplay.innerHTML = `<i class="fas fa-hand-${userChoice}"></i>`;
    computerChoiceDisplay.innerHTML = `<i class="fas fa-hand-${computerChoice}"></i>`;
    //this is for the display screen after the play button is clicked, both choices shown

    const result = determineWinner(userChoice, computerChoice);
    //result will run to determine winner, both choices passed in

    resultMessage.textContent = result;
    //to show the result to the user

    
    if (result.includes("User")) {
      userWins++;
    } else if (result.includes("Computer")) {
      computerWins++;
    } else {
      draws++;
    }//if else to update the counters that track the results of the game

    
    playAgainButton.disabled = false;
    viewResultsButton.disabled = false;
    //options to continue

    gameScreen.style.display = "none";
    resultScreen.style.display = "block";
    //hide the game screen and show the result screen
  });

  playAgainButton.addEventListener("click", function() {
    //to watch if play agian is pressed if so then reset game
    resetGame();
    //only show game scren when reset
    gameScreen.style.display = "block";
    resultScreen.style.display = "none";
  });

  viewResultsButton.addEventListener("click", function() {
    resultScreen.style.display = "none";
    resultsScreen.style.display = "block";
    userWinCount.textContent = `User Wins: ${userWins}`;
    computerWinCount.textContent = `Computer Wins: ${computerWins}`;
    drawCount.textContent = `Draws: ${draws}`;
    //enables the correct content to show all of the results being tracked in the game
  });

  startNewGameButton.addEventListener("click", function() {
    //reset counts and start a new game
    userWins = 0;
    computerWins = 0;
    draws = 0;
    userWinCount.textContent = `User Wins: ${userWins}`;
    computerWinCount.textContent = `Computer Wins: ${computerWins}`;
    drawCount.textContent = `Draws: ${draws}`;
    resetGame();

    //hide the results screen and show the game screen
    resultsScreen.style.display = "none";
    gameScreen.style.display = "block";
  });

  returnToGameButton.addEventListener("click", function() {
    //hide the results screen and show the game screen
    resultsScreen.style.display = "none";
    gameScreen.style.display = "block";
  });

  startButton.addEventListener("click", function() {
    //hide the alternate screen and show the game screen
    alternateScreen.style.display = "none";
    gameScreen.style.display = "block";
  });

  function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }//getting a random number to pick 0-2 in the array for the computer choice

  
  function determineWinner(userChoice, computerChoice) {
    if (userChoice == computerChoice) {
      return "It's a draw! Play again.";
    } else if (
      (userChoice == "rock" && computerChoice == "scissors") ||
      (userChoice == "paper" && computerChoice == "rock") ||
      (userChoice == "scissors" && computerChoice == "paper")
    ) {
      return "User wins! Play again.";
    } else {
      return "Computer wins! Play again.";
    }
  }//function to determine winner using if statements based on the choice of user or computer

  //initialize the game by resetting it
  resetGame();
});
