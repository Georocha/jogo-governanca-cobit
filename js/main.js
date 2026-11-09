// js/main.js
// Entrypoint do jogo. Amarra os módulos, registra os event listeners uma
// única vez e define initializeGame() (chamado no início e no reinício).
//
// Observação: no game.js original os addEventListener ficavam dentro de
// initializeGame(), que é chamado a cada reinício — isso registrava os
// listeners várias vezes. Aqui eles são registrados uma única vez no init.
window.CobitGame = window.CobitGame || {};

/** Inicia/reinicia uma partida: reseta o estado, recria o tabuleiro e a UI. */
CobitGame.initializeGame = function () {
    const dom = CobitGame.dom;

    CobitGame.state.reset();

    // Fecha os modais que possam estar abertos.
    dom.gameOverModal.classList.add('hidden');
    dom.gameOverModal.classList.remove('flex');
    CobitGame.ui.hideMaturityModal();
    CobitGame.ui.hideStatusModal();
    CobitGame.ui.hideBlackSwanModal();

    // Prepara o tabuleiro embaralhado desta partida.
    CobitGame.state.internal.activeBoardSpaces = CobitGame.engine.shuffleBoardSpaces();

    dom.diceButton.disabled = false;
    dom.diceButton.classList.add('button-glow');
    dom.eventText.textContent = "Lance o dado para começar sua jornada de governança!";
    dom.actionButtonsContainer.innerHTML = '';

    CobitGame.ui.generateBoard();
    CobitGame.ui.updateUI();
};

/** Registra os event listeners da UI (uma única vez, na inicialização). */
CobitGame.bindEvents = function () {
    const dom = CobitGame.dom;

    dom.diceButton.addEventListener('click', CobitGame.engine.rollDice);
    dom.restartButton.addEventListener('click', CobitGame.initializeGame);

    dom.statusButton.addEventListener('click', CobitGame.ui.showStatusModal);
    dom.closeStatusModal.addEventListener('click', CobitGame.ui.hideStatusModal);
    dom.closeMaturityModal.addEventListener('click', CobitGame.ui.hideMaturityModal);
};

/** Inicializa o jogo quando o DOM está pronto. */
CobitGame.init = function () {
    CobitGame.cacheDom();
    CobitGame.bindEvents();
    CobitGame.initializeGame();
};

// Usa addEventListener em vez de sobrescrever window.onload (que eliminaria
// qualquer outro handler registrado por bibliotecas).
document.addEventListener('DOMContentLoaded', CobitGame.init);
