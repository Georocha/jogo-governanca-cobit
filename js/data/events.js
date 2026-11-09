// js/data/events.js
// Eventos de decisão do jogo (simulação dos princípios do COBIT).
// Cada evento oferece duas ações com efeitos em alinhamento, risco e custo.
// Observação: as duplicatas existentes no game.js original foram removidas.
window.CobitGame = window.CobitGame || {};
CobitGame.data = CobitGame.data || {};

CobitGame.data.events = [
    {
        text: "Uma nova oportunidade de mercado exige um sistema de TI mais rápido. O que você faz?",
        actions: [
            { text: "Investir em uma nova solução para criar valor.", alignmentChange: 20, riskChange: 5, cost: 30 },
            { text: "Ignorar, o orçamento é limitado.", alignmentChange: -15, riskChange: 0, cost: 0 }
        ]
    },
    {
        text: "Uma auditoria interna revela uma vulnerabilidade de segurança crítica. Como você responde?",
        actions: [
            { text: "Implementar imediatamente um controle de segurança.", alignmentChange: 5, riskChange: -20, cost: 20 },
            { text: "Adiar a correção para priorizar outras tarefas.", alignmentChange: -5, riskChange: 15, cost: 0 }
        ]
    },
    {
        text: "O departamento financeiro pede um relatório sobre o valor gerado pela TI. O que você apresenta?",
        actions: [
            { text: "Demonstrar o valor através de indicadores de desempenho.", alignmentChange: 10, riskChange: -5, cost: 0 },
            { text: "Dizer que é difícil medir o valor da TI.", alignmentChange: -10, riskChange: 0, cost: 0 }
        ]
    },
    {
        text: "Sua equipe de TI está sobrecarregada com tarefas de manutenção. Como você gerencia os recursos?",
        actions: [
            { text: "Otimizar processos e alocar recursos de forma eficiente.", alignmentChange: 10, riskChange: -5, cost: 5 },
            { text: "Contratar mais pessoas (custo alto).", alignmentChange: 15, riskChange: -5, cost: 50 }
        ]
    },
    {
        text: "Uma nova regulamentação exige conformidade em proteção de dados. Qual a sua estratégia?",
        actions: [
            { text: "Garantir a conformidade total com novas políticas.", alignmentChange: 10, riskChange: -15, cost: 15 },
            { text: "Implementar o mínimo necessário para economizar custos.", alignmentChange: -5, riskChange: 10, cost: 5 }
        ]
    },
    {
        text: "Um projeto de TI está atrasado e o negócio precisa dele. Qual sua abordagem?",
        actions: [
            { text: "Revisar o processo de gerenciamento de projetos do COBIT.", alignmentChange: 10, riskChange: -5, cost: 5 },
            { text: "Apressar a equipe para cumprir o prazo, ignorando a qualidade.", alignmentChange: -10, riskChange: 10, cost: 0 }
        ]
    },
    {
        text: "A infraestrutura de TI atual está desatualizada, gerando lentidão. O que você decide?",
        actions: [
            { text: "Planejar a modernização da infraestrutura de acordo com o COBIT.", alignmentChange: 20, riskChange: -10, cost: 40 },
            { text: "Manter a infraestrutura existente para evitar custos.", alignmentChange: -15, riskChange: 10, cost: 0 }
        ]
    },
    {
        text: "Uma solicitação de serviço importante é feita pelo CEO. Como você a trata?",
        actions: [
            { text: "Seguir o processo de gerenciamento de serviços do COBIT.", alignmentChange: 10, riskChange: -5, cost: 0 },
            { text: "Atender a solicitação imediatamente, ignorando processos.", alignmentChange: -5, riskChange: 10, cost: 0 }
        ]
    },
    {
        text: "A equipe de vendas solicita uma nova ferramenta, mas o departamento financeiro questiona o custo. O que você faz?",
        actions: [
            { text: "Avaliar o pedido com base no valor para o negócio, usando os objetivos do COBIT.", alignmentChange: 15, riskChange: -5, cost: 10 },
            { text: "Aprovar imediatamente para manter a equipe de vendas feliz, sem considerar o custo.", alignmentChange: 5, riskChange: 10, cost: 20 }
        ]
    },
    {
        text: "O CIO decide investir em uma tecnologia de ponta, mas com alto risco de falha. Qual o seu conselho?",
        actions: [
            { text: "Recomendar uma análise de risco detalhada e planos de contingência, como o COBIT sugere.", alignmentChange: 10, riskChange: -15, cost: 5 },
            { text: "Apoiar a decisão do CIO sem questionar, para evitar atrito.", alignmentChange: -5, riskChange: 20, cost: 0 }
        ]
    },
    {
        text: "O conselho administrativo exige maior transparência nas operações de TI. Como você atende a essa demanda?",
        actions: [
            { text: "Criar métricas de desempenho de alto nível e relatórios estratégicos para o conselho (Governança).", alignmentChange: 20, riskChange: -10, cost: 5 },
            { text: "Compartilhar os detalhes diários de cada tarefa de TI com o conselho (Gestão).", alignmentChange: -10, riskChange: 5, cost: 0 }
        ]
    },
    {
        text: "Um novo fornecedor de software é contratado. O que você prioriza?",
        actions: [
            { text: "Implementar controles e processos em toda a cadeia de valor (do contrato à operação).", alignmentChange: 15, riskChange: -10, cost: 15 },
            { text: "Focar apenas na instalação e configuração do software.", alignmentChange: -10, riskChange: 10, cost: 0 }
        ]
    },
    {
        text: "O portal do aluno apresenta lentidão constante, gerando reclamações. Qual a sua abordagem?",
        actions: [
            { text: "Investigar a causa raiz para uma solução definitiva (Gerenciamento de Problemas).", alignmentChange: 15, riskChange: -10, cost: 10 },
            { text: "Apenas reiniciar o servidor quando o problema ocorre, como uma solução temporária.", alignmentChange: -10, riskChange: 5, cost: 0 }
        ]
    },
    {
        text: "O conselho quer que a TI gere mais valor para os alunos. Como você inicia esse processo?",
        actions: [
            { text: "Mapear as necessidades dos alunos e definir metas de TI claras para atendê-las.", alignmentChange: 20, riskChange: -5, cost: 5 },
            { text: "Comprar os tablets mais modernos para os laboratórios, assumindo que isso gera valor.", alignmentChange: -5, riskChange: 10, cost: 40 }
        ]
    },
    {
        text: "O sistema de matrículas online caiu durante o período de pico. Como a liderança deve agir para garantir o bom Desempenho (ISO 38500)?",
        actions: [
            { text: "Exigir um plano de melhoria, monitorando o desempenho do serviço de TI.", alignmentChange: 15, riskChange: -15, cost: 10 },
            { text: "Apenas culpar a equipe de TI pela falha, sem uma análise mais profunda.", alignmentChange: -15, riskChange: 10, cost: 0 }
        ]
    }
];
