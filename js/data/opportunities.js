// js/data/opportunities.js
// Eventos de oportunidade: efeitos automáticos (sem escolha do jogador),
// aplicados ao cair em uma casa do tipo "opportunity".
window.CobitGame = window.CobitGame || {};
CobitGame.data = CobitGame.data || {};

CobitGame.data.opportunities = [
    { text: "Sua estratégia de otimização de custos gerou economia. +$20 de orçamento!", resourcesChange: 20 },
    { text: "Uma nova ferramenta de automação foi implementada com sucesso. +10 de Alinhamento.", alignmentChange: 10 },
    { text: "A equipe de TI concluiu um projeto complexo antes do prazo. +15 de Alinhamento.", alignmentChange: 15 },
    { text: "Um novo processo de governança melhorou a tomada de decisões. +10 de Alinhamento.", alignmentChange: 10 },
    { text: "A conformidade com regulamentações foi elogiada na auditoria. -10 de Risco.", riskChange: -10 },
    { text: "A equipe adotou um framework ágil, melhorando a entrega de valor. +15 de Alinhamento.", alignmentChange: 15 },
    { text: "Um investimento em treinamento de segurança reduziu drasticamente as tentativas de phishing. -15 de Risco.", riskChange: -15 },
    { text: "Uma renegociação de contrato com um fornecedor liberou fundos inesperados. +$25 de orçamento!", resourcesChange: 25 },
    { text: "A criação de um catálogo de serviços de TI claro foi muito bem recebida pela empresa. +10 de Alinhamento.", alignmentChange: 10 }
];
