// js/ui/board.js
// Renderização do tabuleiro e animação de movimento do token do jogador.
window.CobitGame = window.CobitGame || {};
CobitGame.ui = CobitGame.ui || {};

/** Gera as células do tabuleiro a partir das casas embaralhadas no estado. */
CobitGame.ui.generateBoard = function () {
    const dom = CobitGame.dom;
    const spaces = CobitGame.state.internal.activeBoardSpaces;
    dom.gameBoard.innerHTML = '';

    for (let i = 0; i < spaces.length; i++) {
        const cell = document.createElement('div');
        const space = spaces[i];
        cell.classList.add('board-cell', 'shadow-sm', 'relative');
        cell.style.backgroundColor = space.color;
        cell.innerHTML =
            '<div class="board-cell-content">' +
            '<span class="font-bold">' + (i + 1) + '</span>' +
            '<span class="text-2xl">' + space.icon + '</span>' +
            '</div>';
        dom.gameBoard.appendChild(cell);
    }

    // Adiciona o token do jogador à primeira célula.
    dom.playerToken = document.createElement('div');
    dom.playerToken.classList.add('player-token');
    dom.playerToken.textContent = '👤';
    dom.gameBoard.children[0].appendChild(dom.playerToken);
};

/**
 * Move o token do jogador célula a célula até a posição destino.
 * @param {number} oldPos posição inicial
 * @param {number} newPos posição final
 * @param {Function} callback executado ao concluir o movimento
 */
CobitGame.ui.movePlayerToken = function (oldPos, newPos, callback) {
    const dom = CobitGame.dom;
    let currentPos = oldPos;
    const interval = setInterval(() => {
        if (currentPos < newPos) {
            currentPos++;
        } else if (currentPos > newPos) {
            currentPos--;
        } else {
            clearInterval(interval);
            callback();
            return;
        }
        if (dom.gameBoard.children[currentPos]) {
            dom.gameBoard.children[currentPos].appendChild(dom.playerToken);
        }
    }, 250); // Velocidade do movimento
};
