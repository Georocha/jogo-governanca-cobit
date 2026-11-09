// js/data/blackSwanEvents.js
// Eventos de crise ("Cisne Negro"): pausam o jogo e exigem uma decisão entre
// três alternativas, com efeitos mais pesados que os eventos comuns.
window.CobitGame = window.CobitGame || {};
CobitGame.data = CobitGame.data || {};

CobitGame.data.blackSwanEvents = [
    {
        text: "ATAQUE RANSOMWARE! Dados críticos da universidade foram criptografados. Os hackers exigem um resgate altíssimo e o tempo está se esgotando. O que você faz?",
        actions: [
            { text: "Pagar o resgate para recuperar os dados rapidamente.", resourcesChange: -70, alignmentChange: -20, riskChange: 10 },
            { text: "Não pagar. Tentar restaurar a partir dos backups, arriscando perda permanente de dados.", resourcesChange: -25, alignmentChange: -25, riskChange: 30 },
            { text: "Isolar os sistemas, notificar as autoridades e iniciar uma recuperação forense.", resourcesChange: -40, alignmentChange: 10, riskChange: -10 }
        ]
    },
    {
        text: "FALHA CRÍTICA DE FORNECEDOR! O principal fornecedor do seu sistema acadêmico faliu. O sistema pode parar a qualquer momento e não há mais suporte.",
        actions: [
            { text: "Iniciar um projeto de migração de emergência para um novo fornecedor.", resourcesChange: -60, alignmentChange: 5, riskChange: 5 },
            { text: "Tentar manter o sistema atual funcionando com a equipe interna, sem suporte.", resourcesChange: -10, alignmentChange: -30, riskChange: 40 },
            { text: "Contratar consultores caríssimos para tentar dar suporte ao sistema antigo.", resourcesChange: -50, alignmentChange: -15, riskChange: 20 }
        ]
    },
    {
        text: "NOVA LEI DE PRIVACIDADE! Uma nova lei de proteção de dados muito mais rígida foi aprovada e entra em vigor imediatamente. Sua instituição não está em conformidade.",
        actions: [
            { text: "Alocar um grande orçamento para uma força-tarefa de conformidade imediata.", resourcesChange: -50, alignmentChange: 15, riskChange: -20 },
            { text: "Ignorar a lei por enquanto e torcer para não ser fiscalizado.", resourcesChange: 0, alignmentChange: -20, riskChange: 50 },
            { text: "Fazer apenas as mudanças mais baratas e visíveis, assumindo o risco de multas.", resourcesChange: -20, alignmentChange: -10, riskChange: 25 }
        ]
    }
];
