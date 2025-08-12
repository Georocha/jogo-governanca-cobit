
        // Variáveis globais para o estado do jogo
        let position = 0;
        let businessAlignment = 100; // Começa com alinhamento total
        let riskLevel = 0; // Começa sem riscos
        let resources = 100; // Recurso inicial (orçamento)
        let turn = 1; // Contador de turno
        const boardSize = 25; // Número de casas no tabuleiro
        let playerToken; // Referência ao token do jogador no DOM
        let currentMaturityLevel = null;
        let activeBoardSpaces = [];

        // Referências aos elementos do DOM
        const gameBoard = document.querySelector('#gameBoard .board');
        const eventText = document.getElementById('eventText');
        const actionButtonsContainer = document.getElementById('actionButtons');
        const diceButton = document.getElementById('diceButton');
        const businessAlignmentDisplay = document.getElementById('businessAlignment');
        const riskLevelDisplay = document.getElementById('riskLevel');
        const resourcesDisplay = document.getElementById('resources');
        const turnCounter = document.getElementById('turnCounter');
        const gameOverModal = document.getElementById('gameOverModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const restartButton = document.getElementById('restartButton');
        const maturityLevelDisplay = document.getElementById('maturityLevelDisplay');
        const maturityModal = document.getElementById('maturityModal');
        const maturityDescriptionsContainer = document.getElementById('maturityDescriptions'); // Corrigido id

        const statusButton = document.getElementById('statusButton');
        const statusModal = document.getElementById('statusModal');
        const closeStatusModal = document.getElementById('closeStatusModal');
        const statusModalMessage = document.getElementById('statusModalMessage');

        const blackSwanModal = document.getElementById('blackSwanModal');
        const blackSwanMessage = document.getElementById('blackSwanMessage');
        const blackSwanActions = document.getElementById('blackSwanActions');


        // Definição dos tipos de casa no tabuleiro
        const boardSpaces = [
            { type: 'start', icon: '🚀', color: '#10b981' }, // Início
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
            { type: 'finish', icon: '🏆', color: '#10b981' } // Fim
        ];
        
        // Objeto com as descrições dos níveis de maturidade
        const maturityLevels = {
            'Inexistente (0)': 'A governança de TI não existe ou não é reconhecida. As decisões são tomadas de forma ad-hoc.',
            'Inicial (1)': 'Há uma abordagem informal para a governança, com pouca padronização. As práticas são reativas.',
            'Repetível (2)': 'As práticas de governança são consistentes, mas dependem do conhecimento individual. Não há processos formais documentados.',
            'Definido (3)': 'Os processos de governança são bem documentados e comunicados em toda a organização, mas a implementação pode ser inconsistente.',
            'Gerenciado (4)': 'Os processos de governança são monitorados e medidos de forma proativa. As decisões são baseadas em dados.',
            'Otimizado (5)': 'A governança de TI é um processo contínuo e aperfeiçoado, com foco na inovação e na melhoria contínua.'
        };

        // Definição dos eventos do jogo (simulação dos princípios do COBIT)
        const gameEvents = [
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
            { // Nova pergunta sobre alinhamento com as necessidades das partes interessadas
            text: "A equipe de vendas solicita uma nova ferramenta, mas o departamento financeiro questiona o custo. O que você faz?",
            actions: [
                { text: "Avaliar o pedido com base no valor para o negócio, usando os objetivos do COBIT.", alignmentChange: 15, riskChange: -5, cost: 10 },
                { text: "Aprovar imediatamente para manter a equipe de vendas feliz, sem considerar o custo.", alignmentChange: 5, riskChange: 10, cost: 20 }
            ]
            },
            { // Nova pergunta sobre gerenciamento de riscos
            text: "O CIO decide investir em uma tecnologia de ponta, mas com alto risco de falha. Qual o seu conselho?",
            actions: [
                { text: "Recomendar uma análise de risco detalhada e planos de contingência, como o COBIT sugere.", alignmentChange: 10, riskChange: -15, cost: 5 },
                { text: "Apoiar a decisão do CIO sem questionar, para evitar atrito.", alignmentChange: -5, riskChange: 20, cost: 0 }
            ]
            },
            { // Nova pergunta sobre governança vs. gestão
            text: "O conselho administrativo exige maior transparência nas operações de TI. Como você atende a essa demanda?",
            actions: [
                { text: "Criar métricas de desempenho de alto nível e relatórios estratégicos para o conselho (Governança).", alignmentChange: 20, riskChange: -10, cost: 5 },
                { text: "Compartilhar os detalhes diários de cada tarefa de TI com o conselho (Gestão).", alignmentChange: -10, riskChange: 5, cost: 0 }
            ]
            },
            { // Nova pergunta sobre o modelo end-to-end
            text: "Um novo fornecedor de software é contratado. O que você prioriza?",
            actions: [
                { text: "Implementar controles e processos em toda a cadeia de valor (do contrato à operação).", alignmentChange: 15, riskChange: -10, cost: 15 },
                { text: "Focar apenas na instalação e configuração do software.", alignmentChange: -10, riskChange: 10, cost: 0 }
            ]
            },
        
            {
            text: "A equipe de vendas solicita uma nova ferramenta, mas o departamento financeiro questiona o custo. O que você faz?",
            actions: [
                { text: "Avaliar o pedido com base no valor para o negócio, usando os objetivos do COBIT.", alignmentChange: 15, riskChange: -5, cost: 10 },
                { text: "Aprovar imediatamente para manter a equipe de vendas feliz, sem considerar o custo.", alignmentChange: 5, riskChange: 10, cost: 20 }
                ]
            },
            
            { // Nova pergunta sobre gerenciamento de riscos
                text: "O CIO decide investir em uma tecnologia de ponta, mas com alto risco de falha. Qual o seu conselho?",
                actions: [
                    { text: "Recomendar uma análise de risco detalhada e planos de contingência, como o COBIT sugere.", alignmentChange: 10, riskChange: -15, cost: 5 },
                    { text: "Apoiar a decisão do CIO sem questionar, para evitar atrito.", alignmentChange: -5, riskChange: 20, cost: 0 }
                ]
            },
            { // Nova pergunta sobre governança vs. gestão
                text: "O conselho administrativo exige maior transparência nas operações de TI. Como você atende a essa demanda?",
                actions: [
                    { text: "Criar métricas de desempenho de alto nível e relatórios estratégicos para o conselho (Governança).", alignmentChange: 20, riskChange: -10, cost: 5 },
                    { text: "Compartilhar os detalhes diários de cada tarefa de TI com o conselho (Gestão).", alignmentChange: -10, riskChange: 5, cost: 0 }
                ]
            },
            { // Nova pergunta sobre o modelo end-to-end
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
        
        // Definição dos eventos de oportunidade e desafio
        const opportunities = [
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

        const challenges = [
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

        // ===== NOVOS EVENTOS DE CRISE =====
        const blackSwanEvents = [
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


        // Função para iniciar ou reiniciar o jogo
        function initializeGame() {
            position = 0;
            businessAlignment = 100;
            riskLevel = 0;
            resources = 100;
            turn = 1;
            diceButton.disabled = false;
            gameOverModal.classList.add('hidden');
            gameOverModal.classList.remove('flex');
            
            activeBoardSpaces = shuffleBoardSpaces();

            updateUI();
            generateBoard();
            diceButton.addEventListener('click', rollDice);
            restartButton.addEventListener('click', initializeGame);

            statusButton.addEventListener('click', showStatusModal);
            closeStatusModal.addEventListener('click', () => {
                statusModal.classList.add('hidden');
                statusModal.classList.remove('flex');
            });

        }

        // Função para embaralhar as casas do tabuleiro, mantendo o início e o fim fixos
        function shuffleBoardSpaces() {
            // Mantém start e finish fixos
            const fixedSpaces = [boardSpaces[0], boardSpaces[boardSpaces.length - 1]];
            const shuffleableSpaces = boardSpaces.slice(1, -1);

            for (let i = shuffleableSpaces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffleableSpaces[i], shuffleableSpaces[j]] = [shuffleableSpaces[j], shuffleableSpaces[i]];
            }
            return [fixedSpaces[0], ...shuffleableSpaces, fixedSpaces[1]];
        }

        // Função para gerar o tabuleiro dinamicamente
        function generateBoard() {
            //const shuffledSpaces = shuffleBoardSpaces();
            gameBoard.innerHTML = '';
            for (let i = 0; i < activeBoardSpaces.length; i++) {
                const cell = document.createElement('div');
                const space = activeBoardSpaces[i];
                cell.classList.add('board-cell', 'shadow-sm', 'relative');
                cell.style.backgroundColor = space.color;
                cell.innerHTML = `<div class="board-cell-content"><span class="font-bold">${i + 1}</span><span class="text-2xl">${space.icon}</span></div>`;
                gameBoard.appendChild(cell);
            }
            // Adiciona o token do jogador à primeira célula
            playerToken = document.createElement('div');
            playerToken.classList.add('player-token');
            playerToken.textContent = '👤';
            gameBoard.children[0].appendChild(playerToken);
        }

        // Função para calcular e atualizar o nível de maturidade
        function updateMaturityLevel() {
            // Cálculo de uma pontuação agregada
            const score = (businessAlignment * 1.5) + (100 - riskLevel) + resources;
            let newMaturityLevel;
            if (score >= 350) {
                newMaturityLevel = "Otimizado (5)";
            } else if (score >= 300) {
                newMaturityLevel = "Gerenciado (4)";
            } else if (score >= 250) {
                newMaturityLevel = "Definido (3)";
            } else if (score >= 180) {
                newMaturityLevel = "Repetível (2)";
            } else if (score >= 120) {
                newMaturityLevel = "Inicial (1)";
            } else {
                newMaturityLevel = "Inexistente (0)";
            }
            
            if (newMaturityLevel !== currentMaturityLevel) {
                currentMaturityLevel = newMaturityLevel;
                maturityLevelDisplay.innerHTML = `${currentMaturityLevel} <button id="maturityInfoButton" class="text-xs text-indigo-400 hover:text-indigo-200">ℹ️</button>`;
                const maturityInfoButton = document.getElementById('maturityInfoButton');
                if (maturityInfoButton) {
                    maturityInfoButton.onclick = showMaturityDescriptions;
                }
            }
        }

        // Função para exibir o modal de descrições de maturidade
        function showMaturityDescriptions() {
            maturityDescriptionsContainer.innerHTML = '';
            for (const level in maturityLevels) {
                const descriptionElement = document.createElement('div');
                descriptionElement.innerHTML = `<strong>${level}:</strong> ${maturityLevels[level]}`;
                maturityDescriptionsContainer.appendChild(descriptionElement);
            }
            maturityModal.classList.remove('hidden');
            maturityModal.classList.add('flex');

            document.getElementById('closeMaturityModal').addEventListener('click', function() {
            maturityModal.classList.add('hidden');
            maturityModal.classList.remove('flex');
        });
        }

        function showStatusModal() {

            const resourcesValue = resourcesDisplay.textContent;
            const resourcesClass = resourcesDisplay.className;

            const alignmentValue = businessAlignmentDisplay.textContent;
            const alignmentClass = businessAlignmentDisplay.className;

            const riskValue = riskLevelDisplay.textContent;
            const riskClass = riskLevelDisplay.className;

            statusModalMessage.innerHTML = `
                <p class="flex justify-between items-center">
                    <strong class="text-xl">Recursos (Budget):</strong>
                    <span class="${resourcesClass} text-2xl">$${resourcesValue}</span>
                </p>
                <p class="text-sm text-gray-400 -mt-2">Seus recursos financeiros. Se chegarem a zero, o jogo acaba.</p>
                
                <hr class="border-gray-600 my-4">

                <p class="flex justify-between items-center">
                    <strong class="text-xl">Alinhamento Estratégico:</strong>
                    <span class="${alignmentClass} text-2xl">${alignmentValue}</span>
                </p>
                <p class="text-sm text-gray-400 -mt-2">Mede o quão bem a TI está alinhada aos objetivos do negócio. Não deixe chegar a zero!</p>
                
                <hr class="border-gray-600 my-4">

                <p class="flex justify-between items-center">
                    <strong class="text-xl">Nível de Risco:</strong>
                    <span class="${riskClass} text-2xl">${riskValue}</span>
                </p>
                <p class="text-sm text-gray-400 -mt-2">Representa as vulnerabilidades e ameaças. Um nível muito alto (acima de 150) é perigoso.</p>
            `;

            statusModal.classList.remove('hidden');
            statusModal.classList.add('flex');
        }

        // Função para atualizar a interface do usuário (UI)
        function updateUI() {
            businessAlignmentDisplay.textContent = businessAlignment;
            businessAlignmentDisplay.className = businessAlignment > 70 ? 'font-bold text-alignment-good' : (businessAlignment > 40 ? 'font-bold text-alignment-medium' : 'font-bold text-alignment-bad');
            
            riskLevelDisplay.textContent = riskLevel;
            riskLevelDisplay.className = riskLevel < 30 ? 'font-bold text-risk-good' : (riskLevel < 70 ? 'font-bold text-risk-medium' : 'font-bold text-risk-bad');

            resourcesDisplay.textContent = resources;
            resourcesDisplay.className = resources > 50 ? 'font-bold text-resources-good' : (resources > 20 ? 'font-bold text-resources-medium' : 'font-bold text-resources-bad');

            turnCounter.textContent = turn;

            // Move o token do jogador
            const oldCell = gameBoard.children[position];
            if (oldCell) {
                oldCell.appendChild(playerToken);
            }

        }

        /**
        * Inicia um evento de Cisne Negro, pausando o jogo e mostrando o modal de crise.
        */
        function triggerBlackSwanEvent() {
            diceButton.disabled = true; // Pausa o jogo
            const event = blackSwanEvents[Math.floor(Math.random() * blackSwanEvents.length)];

            blackSwanMessage.textContent = event.text;
            blackSwanActions.innerHTML = ''; // Limpa ações anteriores

            event.actions.forEach(action => {
                const button = document.createElement('button');
                button.textContent = action.text;
                button.className = "bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105";
                button.onclick = () => handleBlackSwanAction(action);
                blackSwanActions.appendChild(button);
            });

            blackSwanModal.classList.remove('hidden');
            blackSwanModal.classList.add('flex');
        }

        /**
         * Processa a escolha do jogador durante um evento de crise.
         * @param {object} action O objeto de ação escolhido.
         */
        function handleBlackSwanAction(action) {
            resources += (action.resourcesChange || 0);
            businessAlignment += (action.alignmentChange || 0);
            riskLevel += (action.riskChange || 0);

            blackSwanModal.classList.add('hidden');
            blackSwanModal.classList.remove('flex');
            
            updateUI();
            checkGameOver();

            // Se o jogo não acabou, permite que o jogador continue
            if (!gameOverModal.classList.contains('flex')) {
                setTimeout(() => resetTurn(), 1000); // Dá um tempo antes de reativar o botão
            }
        }

        // Função para rolar o dado
        function rollDice() {
            const roll = Math.floor(Math.random() * 6) + 1;
            eventText.textContent = `Você tirou um ${roll}!`;
            diceButton.disabled = true;
            diceButton.classList.remove('button-glow');
            
            // Adiciona animação de shake ao token
            playerToken.classList.add('shake-animation');
            setTimeout(() => {
                playerToken.classList.remove('shake-animation');
            }, 500);

            // Move o jogador
            const oldPosition = position;
            const newPosition = position + roll;

            // Animação de movimento
            movePlayerToken(oldPosition, newPosition, () => {
                // Nova lógica para verificar a posição final antes de processar
                if (newPosition >= boardSize - 1) {
                    position = boardSize - 1;
                    updateUI();
                    turn++;
                    updateMaturityLevel();
                    endGame(true);
                } else {
                    position = newPosition;
                    updateUI();
                    turn++;
                    updateMaturityLevel();
                    checkSpaceType(activeBoardSpaces[position].type);

                    // ===== LÓGICA DO GATILHO DO CISNE NEGRO =====
                    // Chance de 30% a cada 5 turnos (exceto nos primeiros turnos)
                    if (turn > 3 && turn % 5 === 0 && Math.random() < 0.30) {
                        triggerBlackSwanEvent();
                    } else {
                        checkSpaceType(activeBoard[position].type);
                    }

                }
            });
        }
        
        // Função de animação do movimento do token
        function movePlayerToken(oldPos, newPos, callback) {
            let currentPos = oldPos;
            const interval = setInterval(() => {
                if (currentPos < newPos) {
                    currentPos++;
                } else if (currentPos > newPos) {
                    currentPos--;
                } else {
                    clearInterval(interval);
                    callback();
                    return;
                }
                if (gameBoard.children[currentPos]) {
                    gameBoard.children[currentPos].appendChild(playerToken);
                }
            }, 250); // Velocidade do movimento
        }

        // Função para verificar o tipo de casa e executar a ação
        function checkSpaceType(type) {
            switch(type) {
                case 'event':
                    showEvent();
                    break;
                case 'opportunity':
                    const opp = opportunities[Math.floor(Math.random() * opportunities.length)];
                    eventText.textContent = opp.text;
                    resources += (opp.resourcesChange || 0);
                    businessAlignment += (opp.alignmentChange || 0);
                    riskLevel += (opp.riskChange || 0);
                    actionButtonsContainer.innerHTML = '';
                    setTimeout(() => resetTurn(), 4000);
                    break;
                case 'challenge':
                    const chlg = challenges[Math.floor(Math.random() * challenges.length)];
                    eventText.textContent = chlg.text;
                    resources += (chlg.resourcesChange || 0);
                    businessAlignment += (chlg.alignmentChange || 0);
                    riskLevel += (chlg.riskChange || 0);
                    actionButtonsContainer.innerHTML = '';
                    setTimeout(() => resetTurn(), 4000);
                    break;
                case 'finish':
                    endGame(true);
                    break;
                default:
                    resetTurn();
                    break;
            }
        }

        // Função para exibir um evento de jogo com ações do jogador
        function showEvent() {
            const randomEvent = gameEvents[Math.floor(Math.random() * gameEvents.length)];
            eventText.textContent = randomEvent.text;
            
            actionButtonsContainer.innerHTML = '';
            randomEvent.actions.forEach(action => {
                const button = document.createElement('button');
                button.textContent = `${action.text} (Custo: $${action.cost})`;
                button.disabled = resources < action.cost;
                button.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-xl', 'shadow-md', 'transition-all', 'duration-300', 'transform', 'hover:scale-105', 'active:scale-95');
                if (button.disabled) {
                    button.classList.add('opacity-50', 'cursor-not-allowed');
                }
                button.onclick = () => handleAction(action);
                actionButtonsContainer.appendChild(button);
            });
        }

        // Função para processar a ação do jogador
        function handleAction(action) {
            resources = Math.max(0, resources - action.cost);
            businessAlignment = Math.max(0, Math.min(150, businessAlignment + action.alignmentChange));
            riskLevel = Math.max(0, Math.min(150, riskLevel + action.riskChange));
            
            eventText.textContent = `Sua decisão foi tomada! O alinhamento mudou em ${action.alignmentChange}, o risco em ${action.riskChange} e você gastou $${action.cost}.`;
            actionButtonsContainer.innerHTML = '';
            
            updateUI();
            
            checkGameOver();
            if (diceButton.disabled) {
                setTimeout(() => resetTurn(), 1500);
            }
        }

        // Função para resetar o turno
        function resetTurn() {
            eventText.textContent = "Lance o dado para o próximo turno.";
            diceButton.disabled = false;
            diceButton.classList.add('button-glow');
        }

        // Função para verificar as condições de fim de jogo
        function checkGameOver() {
            if (businessAlignment <= 0 || riskLevel >= 150 || resources <= 0) {
                endGame(false);
            }
        }

        // Função para exibir o modal de fim de jogo
        function endGame(isWinner) {
            gameOverModal.classList.remove('hidden');
            gameOverModal.classList.add('flex');
            
             // Lógica para determinar o nível de maturidade
            let maturityLevel = "Inexistente (0)";
            let maturityDescription = "A governança de TI não existe ou não é reconhecida.";

            // Cálculo de uma pontuação agregada para determinar o nível
            // O risco é subtraído porque um risco menor é melhor.
            const finalScore = (businessAlignment * 1.5) + (100 - riskLevel) + resources; 

            if (finalScore >= 350) {
                maturityLevel = "Otimizado (5)";
                maturityDescription = "Você fez uma excelente governança!A governança de TI é um processo contínuo e aperfeiçoado, com foco na inovação.";
            } else if (finalScore >= 300) {
                maturityLevel = "Gerenciado (4)";
                maturityDescription = "Você fez uma ótima governança! Os processos de governança são monitorados e medidos de forma proativa.";
            } else if (finalScore >= 250) {
                maturityLevel = "Definido (3)";
                maturityDescription = "Você está no caminho certo! Os processos de governança são bem documentados e comunicados em toda a organização.";
            } else if (finalScore >= 180) {
                maturityLevel = "Repetível (2)";
                maturityDescription = "Você conseguiu progredir! As práticas de governança são consistentes, mas dependem do conhecimento individual.";
            } else if (finalScore >= 120) {
                maturityLevel = "Inicial (1)";
                maturityDescription = "Você precisa evoluir! Há uma abordagem informal para a governança, com pouca padronização.";
            }
            if (isWinner) {
                modalTitle.textContent = "Fim da jornada! 🎉";
                modalMessage.textContent = `Você chegou ao fim da jornada com um Alinhamento de ${businessAlignment}, Risco de ${riskLevel} e Recursos de $${resources}.\n\nNível de Maturidade: ${maturityLevel}\n${maturityDescription}`;
            } else {
                modalTitle.textContent = "Game Over... 😔";
                let message = '';
                if (businessAlignment <= 0) {
                    message = "O alinhamento com o negócio chegou a zero. A TI perdeu a confiança da empresa. Tente novamente!";
                } else if (riskLevel >= 150) {
                    message = "O nível de risco se tornou inaceitável. A falta de controles de TI causou sérios problemas. Tente novamente!";
                } else if (resources <= 0) {
                    message = "Você ficou sem recursos para tomar decisões críticas. A falta de orçamento comprometeu a governança de TI. Tente novamente!";
                }
                modalMessage.textContent = message;
            }
            diceButton.disabled = true;
        }

        // Inicializa o jogo ao carregar a página
        window.onload = initializeGame;
