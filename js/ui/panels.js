// js/ui/panels.js
// Atualização do painel de estado (recursos/alinhamento/risco/turno/maturidade)
// e apresentação dos eventos de decisão com botões de ação.
window.CobitGame = window.CobitGame || {};
CobitGame.ui = CobitGame.ui || {};

/** Atualiza o painel de estado e a posição do token conforme o estado interno. */
CobitGame.ui.updateUI = function () {
    const dom = CobitGame.dom;
    const s = CobitGame.state.internal;

    dom.businessAlignmentDisplay.textContent = s.businessAlignment;
    dom.businessAlignmentDisplay.className =
        s.businessAlignment > 70 ? 'font-bold text-alignment-good'
        : (s.businessAlignment > 40 ? 'font-bold text-alignment-medium'
        : 'font-bold text-alignment-bad');

    dom.riskLevelDisplay.textContent = s.riskLevel;
    dom.riskLevelDisplay.className =
        s.riskLevel < 30 ? 'font-bold text-risk-good'
        : (s.riskLevel < 70 ? 'font-bold text-risk-medium'
        : 'font-bold text-risk-bad');

    dom.resourcesDisplay.textContent = s.resources;
    dom.resourcesDisplay.className =
        s.resources > 50 ? 'font-bold text-resources-good'
        : (s.resources > 20 ? 'font-bold text-resources-medium'
        : 'font-bold text-resources-bad');

    dom.turnCounter.textContent = s.turn;

    // Move o token para a célula atual.
    const currentCell = dom.gameBoard.children[s.position];
    if (currentCell && dom.playerToken) {
        currentCell.appendChild(dom.playerToken);
    }

    CobitGame.ui.updateMaturityDisplay();
};

/** Renderiza o nível de maturidade atual com um botão para abrir as descrições. */
CobitGame.ui.updateMaturityDisplay = function () {
    const dom = CobitGame.dom;
    const level = CobitGame.state.updateMaturityLevel();
    dom.maturityLevelDisplay.innerHTML =
        level + ' <button id="maturityInfoButton" class="text-xs text-indigo-400 hover:text-indigo-200" aria-label="Ver níveis de maturidade">ℹ️</button>';
    const maturityInfoButton = document.getElementById('maturityInfoButton');
    if (maturityInfoButton) {
        maturityInfoButton.onclick = CobitGame.ui.showMaturityDescriptions;
    }
};

/** Exibe um evento de decisão com as ações disponíveis como botões. */
CobitGame.ui.showEvent = function () {
    const dom = CobitGame.dom;
    const s = CobitGame.state.internal;
    const events = CobitGame.data.events;
    const randomEvent = events[Math.floor(Math.random() * events.length)];

    dom.eventText.textContent = randomEvent.text;
    dom.actionButtonsContainer.innerHTML = '';

    randomEvent.actions.forEach(action => {
        const button = document.createElement('button');
        button.textContent = action.text + ' (Custo: $' + action.cost + ')';
        button.disabled = s.resources < action.cost;
        button.classList.add(
            'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'font-bold',
            'py-2', 'px-4', 'rounded-xl', 'shadow-md', 'transition-all',
            'duration-300', 'transform', 'hover:scale-105', 'active:scale-95'
        );
        if (button.disabled) {
            button.classList.add('opacity-50', 'cursor-not-allowed');
        }
        button.onclick = () => CobitGame.ui.handleAction(action);
        dom.actionButtonsContainer.appendChild(button);
    });
};

/** Processa a ação escolhida pelo jogador e atualiza o estado/turno. */
CobitGame.ui.handleAction = function (action) {
    const dom = CobitGame.dom;
    const s = CobitGame.state.internal;

    CobitGame.state.applyEffects(action);

    dom.eventText.textContent =
        'Sua decisão foi tomada! O alinhamento mudou em ' + action.alignmentChange +
        ', o risco em ' + action.riskChange + ' e você gastou $' + action.cost + '.';
    dom.actionButtonsContainer.innerHTML = '';

    CobitGame.ui.updateUI();
    CobitGame.engine.checkGameOver();

    if (dom.diceButton.disabled) {
        setTimeout(() => CobitGame.ui.resetTurn(), 1500);
    }
};

/** Reativa o botão do dado e prepara o próximo turno. */
CobitGame.ui.resetTurn = function () {
    const dom = CobitGame.dom;
    dom.eventText.textContent = "Lance o dado para o próximo turno.";
    dom.diceButton.disabled = false;
    dom.diceButton.classList.add('button-glow');
};
