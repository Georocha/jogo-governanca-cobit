// js/data/boardSpaces.js
// Definição dos tipos de casa do tabuleiro.
// A primeira (start) e a última (finish) são fixas; as demais são embaralhadas
// a cada início de jogo pela engine/shuffleBoardSpaces().
window.CobitGame = window.CobitGame || {};
CobitGame.data = CobitGame.data || {};

CobitGame.data.boardSpaces = [
    { type: 'start', icon: '🚀', color: '#10b981' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'opportunity', icon: '💡', color: '#4ade80' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'challenge', icon: '🚨', color: '#f87171' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'opportunity', icon: '💡', color: '#4ade80' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'challenge', icon: '🚨', color: '#f87171' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'opportunity', icon: '💡', color: '#4ade80' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'challenge', icon: '🚨', color: '#f87171' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'opportunity', icon: '💡', color: '#4ade80' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'challenge', icon: '🚨', color: '#f87171' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'opportunity', icon: '💡', color: '#4ade80' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'challenge', icon: '🚨', color: '#f87171' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'opportunity', icon: '💡', color: '#4ade80' },
    { type: 'event', icon: '❓', color: '#9333ea' },
    { type: 'finish', icon: '🏆', color: '#10b981' }
];

// Número total de casas (lido pela engine para detectar o fim da partida).
CobitGame.data.boardSize = CobitGame.data.boardSpaces.length;
