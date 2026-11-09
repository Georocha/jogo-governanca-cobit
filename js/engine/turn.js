// js/engine/turn.js
// Processa o tipo de casa em que o jogador caiu.
// Observação: o game.js original chamava checkSpaceType duas vezes na mesma
// jogada (uma explicitamente e outra referenciando a variável inexistente
// `activeBoard`). Aqui a casa é processada uma única vez.
window.CobitGame = window.CobitGame || {};
CobitGame.engine = CobitGame.engine || {};

/**
 * Resolve o efeito da casa atual conforme o seu tipo.
 * @param {string} type tipo da casa (event/opportunity/challenge/finish/...)
 */
CobitGame.engine.checkSpaceType = function (type) {
    const dom = CobitGame.dom;

    switch (type) {
        case 'event':
            CobitGame.ui.showEvent();
            break;

        case 'opportunity': {
            const opps = CobitGame.data.opportunities;
            const opp = opps[Math.floor(Math.random() * opps.length)];
            dom.eventText.textContent = opp.text;
            CobitGame.state.applyEffects(opp);
            dom.actionButtonsContainer.innerHTML = '';
            CobitGame.ui.updateUI();
            CobitGame.engine.checkGameOver();
            setTimeout(() => CobitGame.ui.resetTurn(), 4000);
            break;
        }

        case 'challenge': {
            const chs = CobitGame.data.challenges;
            const chlg = chs[Math.floor(Math.random() * chs.length)];
            dom.eventText.textContent = chlg.text;
            CobitGame.state.applyEffects(chlg);
            dom.actionButtonsContainer.innerHTML = '';
            CobitGame.ui.updateUI();
            CobitGame.engine.checkGameOver();
            setTimeout(() => CobitGame.ui.resetTurn(), 4000);
            break;
        }

        case 'finish':
            CobitGame.engine.endGame(true);
            break;

        default:
            CobitGame.ui.resetTurn();
            break;
    }
};
