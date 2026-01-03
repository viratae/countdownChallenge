const form = (function formController() {
    const customizeButton = document.querySelector('#customizeButton');
    const closeModal = document.querySelector('#closeModal');
    const formElement = document.querySelector('#customizeForm');
    const modal = document.querySelector('.modal');

    //Default Values
    let customizations = {
        players: {
            player1Name: 'Player 1',
            player2Name: 'Player 2',
        },
        countdownSettings: {
            countdownNumber: 50,
            countdownMin: 1,
            countdownMax: 6,
        },
    };
    customizeButton.addEventListener('click', () => {
        modal.classList.add('show');
    });
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.remove('show');

        customizations = {
            players: {
                player1Name: document.querySelector('#player1Name').value,
                player2Name: document.querySelector('#player2Name').value,
            },
            countdownSettings: {
                countdownInitial: document.querySelector('countdownNumber'). value,
                countdownNumber: document.querySelector('#countdownNumber').value,
                countdownMin: document.querySelector('#countdownMin').value,
                countdownMax: document.querySelector('#countdownMax').value,
            },
        };
        reset();
        screen.render();
    });
    // --- Validation --- //
    function validate() {
        if(Number(document.querySelector('#countdownMin').value) >= Number(document.querySelector('#countdownMax').value)) {
            document.querySelector('#countdownMax').setCustomValidity("Your max must be greater than your min");
            console.log("Min greater than max");
        }
        else {
            document.querySelector('#countdownMax').setCustomValidity("");
        }
    }
    document.querySelector('#countdownMin').addEventListener('input', validate);
    document.querySelector('#countdownMax').addEventListener('input', validate);
    // --- Public Methods --- //
    function reset() {
        customizations.countdownSettings.countdownNumber = customizations.countdownSettings.countdownInitial;
    }
    function getCustomizations() {
        return customizations;
    }
    return {
        getCustomizations,
    };
})();
const game = (function gameController() {
    
    let turnIndex = 0;
    let playerTaken = {
        player1Taken: 0,
        player2Taken: 0
    }
    function changeTurn() {
        turnIndex++;
    }
    // --- Public Methods --- //
    
    function getPlayerTaken() {
        return playerTaken;
    }
    function getTurn() {
        if (turnIndex % 2 === 0) {
            return 1;
        } else {
            return 2;
        }
    }
    function playTurn() {
        const customizations = form.getCustomizations();
        const player = getTurn();
       
        let min = Math.ceil(customizations.countdownSettings.countdownMin);
        let max = Math.ceil(customizations.countdownSettings.countdownMax);
        
        const increment = Math.floor(Math.random() * (max - min + 1) + min);
         if(getTurn() === 1) {
            if(increment <= customizations.countdownSettings.countdownNumber) {
                playerTaken.player1Taken += increment;
                customizations.countdownSettings.countdownNumber -= increment;
            }
            else {
                playerTaken.player1Taken += customizations.countdownSettings.countdownNumber;
                customizations.countdownSettings.countdownNumber = 0;
                screen.endGame();
            }
        }
        else if(player === 2) {
            if(increment <= customizations.countdownSettings.countdownNumber) {
                playerTaken.player2Taken += increment;
                customizations.countdownSettings.countdownNumber -= increment;
            }
            else {
                playerTaken.player2Taken += customizations.countdownSettings.countdownNumber;
                customizations.countdownSettings.countdownNumber = 0;
                screen.endGame();
            }
        }
        changeTurn();
    }
    return {
        getPlayerTaken, getTurn, playTurn
    };
})();
const screen = (function ScreenController() {
    const playButton = document.querySelector('#playButton');
    const countdownNumberText = document.querySelector('#countdownNumberText');
    const countdownMinText = document.querySelector('#countdownMinText');
    const countdownMaxText = document.querySelector('#countdownMaxText');
    const player1Text = document.querySelector('#player1Text');
    const player2Text = document.querySelector('#player2Text');
    const player1TakenText = document.querySelector('#player1TakenText');
    const player2TakenText = document.querySelector('#player2TakenText');
    const turnIndicatorText = document.querySelector('#turnIndicatorText');
    playButton.addEventListener('click', () => {
        game.playTurn();
        render();
    });
    function render() {
        const customizations = form.getCustomizations();
        const playerTaken = game.getPlayerTaken()
        countdownNumberText.textContent = customizations.countdownSettings.countdownNumber;
        countdownMinText.textContent = 'Min: ' + customizations.countdownSettings.countdownMin;
        countdownMaxText.textContent = 'Max: ' + customizations.countdownSettings.countdownMax;
        player1TakenText.textContent = playerTaken.player1Taken;
        player2TakenText.textContent = playerTaken.player2Taken;
        player1Text.textContent = customizations.players.player1Name;
        player2Text.textContent = customizations.players.player2Name;
        if(game.getTurn() === 1) {
            turnIndicatorText.textContent = 'Turn: ' + customizations.players.player1Name;
        }
        else {
            turnIndicatorText.textContent = 'Turn: ' + customizations.players.player2Name;
        }
        
    }
    function endGame() {
        playButton.disabled = true;
    }
    return {
        render,
        endGame,
    };
})();
