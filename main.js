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
            countdownInitial: 50,
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
                countdownInitial: document.querySelector('#countdownInitial').value,
                countdownMin: document.querySelector('#countdownMin').value,
                countdownMax: document.querySelector('#countdownMax').value,
            },
        };
        screen.render();
    });

    // --- Public Methods --- //
    function getCustomizations() {
        return customizations;
    }
    return {
        getCustomizations,
    };
})();
const game = (function gameController() {
    return { 
        
    }
})();
const screen = (function ScreenController() {
    const countdownNumberText = document.querySelector('#countdownNumberText');
    const countdownMinText = document.querySelector('#countdownMinText');
    const countdownMaxText = document.querySelector('#countdownMaxText');
    const player1Text = document.querySelector('#player1Text');
    const player2Text = document.querySelector('#player2Text');
    const turnIndicatorText = document.querySelector('#turnIndicatorText');

    function render() {
        const customizations = form.getCustomizations();
        countdownNumberText.textContent = customizations.countdownSettings.countdownInitial;
        countdownMinText.textContent = "Min: " + customizations.countdownSettings.countdownMin
        countdownMaxText.textContent = "Max: " + customizations.countdownSettings.countdownMax

        player1Text.textContent = customizations.players.player1Name;
        player2Text.textContent = customizations.players.player2Name;
        turnIndicatorText.textContent = "Turn: " + "ADD";
    }
    return {
        render
    };
})();
const custom = form.getCustomizations();
console.log(custom);
