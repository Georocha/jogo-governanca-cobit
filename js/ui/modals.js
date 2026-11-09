// js/ui/modals.js
// Modais informativos (descrições de maturidade, status detalhado) e o modal
// de crise do Cisne Negro.
window.CobitGame = window.CobitGame || {};
CobitGame.ui = CobitGame.ui || {};

/** Preenche e abre o modal com as descrições dos níveis de maturidade. */
CobitGame.ui.showMaturityDescriptions = function () {
    const dom = CobitGame.dom;
    const levels = CobitGame.data.maturityLevels;

    dom.maturityDescriptionsContainer.innerHTML = '';
    for (const level in levels) {
        const descriptionElement = document.createElement('div');
        descriptionElement.innerHTML = '<strong>' + level + ':</strong> ' + levels[level];
        dom.maturityDescriptionsContainer.appendChild(descriptionElement);
    }
    dom.maturityModal.classList.remove('hidden');
    dom.maturityModal.classList.add('flex');
};

/** Fecha o modal de descrições de maturidade. */
CobitGame.ui.hideMaturityModal = function () {
    const dom = CobitGame.dom;
    dom.maturityModal.classList.add('hidden');
    dom.maturityModal.classList.remove('flex');
};

/** Abre o modal de status detalhado, espelhando os indicadores do painel. */
CobitGame.ui.showStatusModal = function () {
    const dom = CobitGame.dom;

    const resourcesValue = dom.resourcesDisplay.textContent;
    const resourcesClass = dom.resourcesDisplay.className;
    const alignmentValue = dom.businessAlignmentDisplay.textContent;
    const alignmentClass = dom.businessAlignmentDisplay.className;
    const riskValue = dom.riskLevelDisplay.textContent;
    const riskClass = dom.riskLevelDisplay.className;

    dom.statusModalMessage.innerHTML =
        '<p class="flex justify-between items-center">' +
            '<strong class="text-xl">Recursos (Budget):</strong>' +
            '<span class="' + resourcesClass + ' text-2xl">$' + resourcesValue + '</span>' +
        '</p>' +
        '<p class="text-sm text-gray-400 -mt-2">Seus recursos financeiros. Se chegarem a zero, o jogo acaba.</p>' +
        '<hr class="border-gray-600 my-4">' +
        '<p class="flex justify-between items-center">' +
            '<strong class="text-xl">Alinhamento Estratégico:</strong>' +
            '<span class="' + alignmentClass + ' text-2xl">' + alignmentValue + '</span>' +
        '</p>' +
        '<p class="text-sm text-gray-400 -mt-2">Mede o quão bem a TI está alinhada aos objetivos do negócio. Não deixe chegar a zero!</p>' +
        '<hr class="border-gray-600 my-4">' +
        '<p class="flex justify-between items-center">' +
            '<strong class="text-xl">Nível de Risco:</strong>' +
            '<span class="' + riskClass + ' text-2xl">' + riskValue + '</span>' +
        '</p>' +
        '<p class="text-sm text-gray-400 -mt-2">Representa as vulnerabilidades e ameaças. Um nível muito alto (acima de 150) é perigoso.</p>';

    dom.statusModal.classList.remove('hidden');
    dom.statusModal.classList.add('flex');
};

/** Fecha o modal de status detalhado. */
CobitGame.ui.hideStatusModal = function () {
    const dom = CobitGame.dom;
    dom.statusModal.classList.add('hidden');
    dom.statusModal.classList.remove('flex');
};

/**
 * Inicia um evento de Cisne Negro, pausando o jogo e exibindo o modal de crise.
 */
CobitGame.ui.triggerBlackSwanEvent = function () {
    const dom = CobitGame.dom;
    dom.diceButton.disabled = true; // Pausa o jogo

    const events = CobitGame.data.blackSwanEvents;
    const event = events[Math.floor(Math.random() * events.length)];

    dom.blackSwanMessage.textContent = event.text;
    dom.blackSwanActions.innerHTML = ''; // Limpa ações anteriores

    event.actions.forEach(action => {
        const button = document.createElement('button');
        button.textContent = action.text;
        button.className = "bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105";
        button.onclick = () => CobitGame.ui.handleBlackSwanAction(action);
        dom.blackSwanActions.appendChild(button);
    });

    dom.blackSwanModal.classList.remove('hidden');
    dom.blackSwanModal.classList.add('flex');
};

/** Fecha o modal do Cisne Negro. */
CobitGame.ui.hideBlackSwanModal = function () {
    const dom = CobitGame.dom;
    dom.blackSwanModal.classList.add('hidden');
    dom.blackSwanModal.classList.remove('flex');
};

/**
 * Processa a escolha do jogador durante um evento de crise.
 * @param {object} action o objeto de ação escolhido
 */
CobitGame.ui.handleBlackSwanAction = function (action) {
    const dom = CobitGame.dom;

    CobitGame.state.applyEffects(action);
    CobitGame.ui.hideBlackSwanModal();
    CobitGame.ui.updateUI();
    CobitGame.engine.checkGameOver();

    // Se o jogo não acabou, permite que o jogador continue.
    if (!dom.gameOverModal.classList.contains('flex')) {
        setTimeout(() => CobitGame.ui.resetTurn(), 1000); // Dá um tempo antes de reativar o botão
    }
};
