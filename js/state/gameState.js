// js/state/gameState.js
// Estado central do jogo. Toda mutação de recursos/alinhamento/risco passa por
// applyEffects(), garantindo clamping consistente (no original, oportunidades e
// desafios não aplicavam clamp, podendo extrapolar 0..150).
window.CobitGame = window.CobitGame || {};
CobitGame.state = CobitGame.state || {};

// Configurações de limite do estado.
const LIMITS = { resourcesMin: 0, alignmentMin: 0, alignmentMax: 150, riskMin: 0, riskMax: 150 };

// Estado interno. Não mutar diretamente; usar applyEffects() ou reset().
CobitGame.state.internal = {
    position: 0,
    businessAlignment: 100,
    riskLevel: 0,
    resources: 100,
    turn: 1,
    currentMaturityLevel: null,
    // Casas embaralhadas da partida atual (preenchido pela engine ao iniciar).
    activeBoardSpaces: []
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/**
 * Aplica os efeitos de uma ação/evento ao estado.
 * Aceita cost (gasto subtraído de resources) e/ou resourcesChange (delta direto).
 * @param {{cost?:number, resourcesChange?:number, alignmentChange?:number, riskChange?:number}} effects
 */
CobitGame.state.applyEffects = function (effects) {
    effects = effects || {};
    const s = CobitGame.state.internal;
    const resourceDelta = (effects.resourcesChange || 0) - (effects.cost || 0);
    s.resources = Math.max(LIMITS.resourcesMin, s.resources + resourceDelta);
    s.businessAlignment = clamp(s.businessAlignment + (effects.alignmentChange || 0), LIMITS.alignmentMin, LIMITS.alignmentMax);
    s.riskLevel = clamp(s.riskLevel + (effects.riskChange || 0), LIMITS.riskMin, LIMITS.riskMax);
};

/** Define a posição do jogador no tabuleiro. */
CobitGame.state.setPosition = function (pos) {
    CobitGame.state.internal.position = pos;
};

/** Incrementa o contador de turnos. */
CobitGame.state.incrementTurn = function () {
    CobitGame.state.internal.turn += 1;
};

/** Reseta o estado para o início de uma nova partida. */
CobitGame.state.reset = function () {
    Object.assign(CobitGame.state.internal, {
        position: 0,
        businessAlignment: 100,
        riskLevel: 0,
        resources: 100,
        turn: 1,
        currentMaturityLevel: null,
        activeBoardSpaces: []
    });
};

/** Atualiza e retorna o nível de maturidade calculado a partir do estado atual. */
CobitGame.state.updateMaturityLevel = function () {
    const s = CobitGame.state.internal;
    const score = CobitGame.state.calculateScore(s);
    let level;
    if (score >= 350) level = "Otimizado (5)";
    else if (score >= 300) level = "Gerenciado (4)";
    else if (score >= 250) level = "Definido (3)";
    else if (score >= 180) level = "Repetível (2)";
    else if (score >= 120) level = "Inicial (1)";
    else level = "Inexistente (0)";

    s.currentMaturityLevel = level;
    return level;
};

/** Pontuação agregada usada para determinar o nível de maturidade. */
CobitGame.state.calculateScore = function (s) {
    return (s.businessAlignment * 1.5) + (100 - s.riskLevel) + s.resources;
};
