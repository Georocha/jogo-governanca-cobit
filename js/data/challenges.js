// js/data/challenges.js
// Eventos de desafio: efeitos automáticos (sem escolha do jogador),
// aplicados ao cair em uma casa do tipo "challenge".
window.CobitGame = window.CobitGame || {};
CobitGame.data = CobitGame.data || {};

CobitGame.data.challenges = [
    { text: "Problemas inesperados de infraestrutura custam caro. -$20 de orçamento!", resourcesChange: -20 },
    { text: "Uma falha de segurança causou uma pequena perda de dados. +15 de Risco.", riskChange: 15 },
    { text: "Um projeto-chave de TI está atrasado, afetando as metas de negócio. -10 de Alinhamento.", alignmentChange: -10 },
    { text: "Um novo requisito de segurança gerou um custo inesperado. -$15 de orçamento!", resourcesChange: -15 },
    { text: "A falta de comunicação entre TI e o negócio resultou em um projeto inútil. -15 de Alinhamento.", alignmentChange: -15 },
    { text: "Um ataque de ransomware explorou uma vulnerabilidade não corrigida. +25 de Risco!", riskChange: 25 },
    { text: "'Shadow IT': O departamento de marketing comprou um software sem a aprovação da TI, criando riscos. +10 de Risco.", riskChange: 10 },
    { text: "Um funcionário chave da equipe de TI pediu demissão, impactando projetos. -10 de Alinhamento.", alignmentChange: -10 },
    { text: "A licença de um software crítico expirou, causando uma parada inesperada. -$25 de orçamento para a renovação de emergência!", resourcesChange: -25 }
];
