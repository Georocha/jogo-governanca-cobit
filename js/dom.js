// js/dom.js
// Cache central das referências de DOM. populado por cacheDom() na inicialização
// (após o DOM existir). Outros módulos leem de CobitGame.dom em vez de chamar
// getElementById repetidamente.
window.CobitGame = window.CobitGame || {};
CobitGame.dom = {};

CobitGame.cacheDom = function () {
    const d = CobitGame.dom;
    d.gameBoard = document.querySelector('#gameBoard .board');
    d.eventText = document.getElementById('eventText');
    d.actionButtonsContainer = document.getElementById('actionButtons');
    d.diceButton = document.getElementById('diceButton');
    d.businessAlignmentDisplay = document.getElementById('businessAlignment');
    d.riskLevelDisplay = document.getElementById('riskLevel');
    d.resourcesDisplay = document.getElementById('resources');
    d.turnCounter = document.getElementById('turnCounter');
    d.maturityLevelDisplay = document.getElementById('maturityLevelDisplay');

    // Modais e seus elementos internos.
    d.gameOverModal = document.getElementById('gameOverModal');
    d.modalTitle = document.getElementById('modalTitle');
    d.modalMessage = document.getElementById('modalMessage');
    d.restartButton = document.getElementById('restartButton');

    d.maturityModal = document.getElementById('maturityModal');
    d.maturityDescriptionsContainer = document.getElementById('maturityDescriptions');
    d.closeMaturityModal = document.getElementById('closeMaturityModal');

    d.statusButton = document.getElementById('statusButton');
    d.statusModal = document.getElementById('statusModal');
    d.closeStatusModal = document.getElementById('closeStatusModal');
    d.statusModalMessage = document.getElementById('statusModalMessage');

    d.blackSwanModal = document.getElementById('blackSwanModal');
    d.blackSwanMessage = document.getElementById('blackSwanMessage');
    d.blackSwanActions = document.getElementById('blackSwanActions');

    // Referência ao token do jogador no tabuleiro (criado por ui/board.js).
    d.playerToken = null;
};
