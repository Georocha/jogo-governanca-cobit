// js/engine/dice.js
// Lógica de lançar o dado e mover o jogador.
// Correção: o game.js original chamava checkSpaceType duas vezes na mesma
// jogada (a segunda referenciava a variável inexistente `activeBoard`,
// lançando ReferenceError). Agora a casa é resolvida uma única vez e o
// Cisne Negro, quando dispara, substitui o processamento normal da casa.
window.CobitGame = window.CobitGame || {};
CobitGame.engine = CobitGame.engine || {};

/** Lança o dado, move o jogador e resolve o resultado da jogada. */
CobitGame.engine.rollDice = function () {
    const dom = CobitGame.dom;
    const s = CobitGame.state.internal;
    const boardSize = CobitGame.data.boardSize;

    const roll = Math.floor(Math.random() * 6) + 1;
    dom.eventText.textContent = 'Você tirou um ' + roll + '!';
    dom.diceButton.disabled = true;
    dom.diceButton.classList.remove('button-glow');

    // Animação de "shake" do token ao rolar o dado.
    dom.playerToken.classList.add('shake-animation');
    setTimeout(() => dom.playerToken.classList.remove('shake-animation'), 500);

    const oldPosition = s.position;
    const newPosition = oldPosition + roll;

    CobitGame.ui.movePlayerToken(oldPosition, newPosition, () => {
        if (newPosition >= boardSize - 1) {
            // Chegou ao fim: vitória.
            CobitGame.state.setPosition(boardSize - 1);
            CobitGame.state.incrementTurn();
            CobitGame.ui.updateUI();
            CobitGame.engine.endGame(true);
        } else {
            CobitGame.state.setPosition(newPosition);
            CobitGame.state.incrementTurn();
            CobitGame.ui.updateUI();

            // Cisne Negro (crise) substitui a casa normal quando a condição dispara:
            // 30% de chance a cada 5 turnos, a partir do 4º turno.
            if (s.turn > 3 && s.turn % 5 === 0 && Math.random() < 0.30) {
                CobitGame.ui.triggerBlackSwanEvent();
            } else {
                CobitGame.engine.checkSpaceType(s.activeBoardSpaces[s.position].type);
            }
        }
    });
};
