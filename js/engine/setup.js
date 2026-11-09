// js/engine/setup.js
// Lógica pura (sem DOM) para preparar a partida.
window.CobitGame = window.CobitGame || {};
CobitGame.engine = CobitGame.engine || {};

/**
 * Embaralha as casas do tabuleiro mantendo a primeira (start) e a última (finish)
 * fixas. Retorna um novo array com a ordem embaralhada.
 */
CobitGame.engine.shuffleBoardSpaces = function () {
    const spaces = CobitGame.data.boardSpaces;
    const fixedSpaces = [spaces[0], spaces[spaces.length - 1]];
    const shuffleableSpaces = spaces.slice(1, -1);

    for (let i = shuffleableSpaces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleableSpaces[i], shuffleableSpaces[j]] = [shuffleableSpaces[j], shuffleableSpaces[i]];
    }
    return [fixedSpaces[0], ...shuffleableSpaces, fixedSpaces[1]];
};
