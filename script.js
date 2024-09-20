let gameInterface = document.querySelector(".game-interface");
let startGameButton = document.querySelector(".start-game");
let quitGameButton = document.querySelector(".quit-game");
let playAgainButton = document.querySelector(".play-again");
let homeButton = document.querySelector(".home-button");
let gameInstructions = document.querySelector(".game-instructions");
let instructionContainer = document.querySelector(".instructions-container");
let nameContainer = document.querySelector(".name-container");
let resultContainer = document.querySelector(".result-container");
let resultMessage = document.getElementById("result-message");
let playerNameInput = document.querySelector(".player-name");
let hrTags = document.querySelectorAll("hr")

let randomNumber;
let chances = 6;
let buttonsHTML = '';
let playerName = 'Player';
let gameStarted = false;  // Track whether the game has started

const hideInitialElements = () => {
    nameContainer.style.display = "none";
    startGameButton.style.display = "none";
    instructionContainer.style.display = "none";
    resultContainer.classList.remove("hidden");
};

const startGame = () => {

    hrTags.forEach((hrTag) => {
        hrTag.setAttribute("style", "display:none")
    })

    playerName = playerNameInput.value.trim() || 'Player';
    if (!playerName) {
        alert('Please enter your name before starting the game.');
        return;
    }

    resetGame();
    hideInitialElements();
    resultContainer.classList.add("hidden");
    chances = 6;
    gameStarted = true;

    randomNumber = Math.floor(Math.random() * 40) + 1;

    buttonsHTML = '';
    for (let i = 1; i <= 40; i++) {
        buttonsHTML += `<button class="game-button" data-number="${i}">${i}</button>`;
        if (i % 8 === 0) {
            buttonsHTML += '<br>';
        }
    }
    gameInterface.innerHTML = buttonsHTML;
    gameInterface.setAttribute("style", "margin-top: 25px;")

    document.querySelectorAll('.game-button').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    updateChancesDisplay();
};

const handleButtonClick = (event) => {
    if (chances <= 0) return;

    const button = event.target;
    const number = parseInt(button.getAttribute('data-number'));

    if (number === randomNumber) {
        button.style.backgroundColor = 'green';
        button.style.color = 'white';
        resultMessage.textContent = `${playerName}, congratulations! You guessed the number ${randomNumber} correctly in ${7 - chances} chances.`;
        resultContainer.classList.remove("hidden");
        playAgainButton.classList.remove("hidden");
        homeButton.classList.remove("hidden");
        disableAllButtons();
        chances = 0;
        updateChancesDisplay();
    } else {
        chances--;
        if (number > randomNumber) {
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
        } else {
            button.style.backgroundColor = 'yellow';
        }

        if (chances === 0) {
            resultMessage.textContent = `${playerName}, game over! The correct number was ${randomNumber}.`;
            resultContainer.classList.remove("hidden");
            playAgainButton.classList.remove("hidden");
            homeButton.classList.remove("hidden");
            disableAllButtons();
        }
        updateChancesDisplay();
    }
};

const updateChancesDisplay = () => {
    const chancesDisplay = document.getElementById("chances-display");
    if (chancesDisplay) {
        chancesDisplay.textContent = `Chances left: ${chances}`;
    } else {
        const newChancesDisplay = document.createElement('p');
        newChancesDisplay.id = 'chances-display';
        newChancesDisplay.textContent = `Chances left: ${chances}`;
        document.querySelector('.game-instructions').appendChild(newChancesDisplay);
    }
};

const disableAllButtons = () => {
    document.querySelectorAll('.game-button').forEach(button => {
        button.disabled = true;
    });
};

const quitGame = () => {
    playerName = playerNameInput.value.trim() || 'Player';
    gameInterface.innerHTML = '';
    if (gameStarted) {
        hideInitialElements();
    } else {
        instructionContainer.style.display = "none";
    }
    resultMessage.textContent = `${playerName}, the game has been quit.`;
    // playAgainButton.classList.remove("hidden");
    homeButton.classList.remove("hidden");
    quitGameButton.classList.add("hidden");
    // nameContainer.classList.add('hidden');
    gameInstructions.classList.add("hidden");
    hideInitialElements();
    hrTags.forEach((hrTag) => {
        hrTag.setAttribute("style", "display:none")
    })

    chances = 0;
    updateChancesDisplay();
};

const resetGame = () => {
    gameInterface.innerHTML = '';
    nameContainer.style.display = "";
    startGameButton.style.display = "";
    instructionContainer.style.display = "";
    resultContainer.classList.add("hidden");
    playAgainButton.classList.add("hidden");
    homeButton.classList.add("hidden");
    quitGameButton.classList.remove("hidden");
    gameStarted = false;
};

const goHome = () => {
    location.reload();
};

startGameButton.addEventListener('click', startGame);
quitGameButton.addEventListener('click', quitGame);
playAgainButton.addEventListener('click', startGame);
homeButton.addEventListener('click', goHome);
