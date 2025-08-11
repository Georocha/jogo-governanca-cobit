
        // Variáveis globais para o estado do jogo
        let position = 0;
        let businessAlignment = 100; // Começa com alinhamento total
        let riskLevel = 0; // Começa sem riscos
        let resources = 100; // Recurso inicial (orçamento)
        let turn = 1; // Contador de turno
        const boardSize = 25; // Número de casas no tabuleiro
        let playerToken; // Referência ao token do jogador no DOM
        let currentMaturityLevel = null;

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
            }
        ];
        
        // Definição dos eventos de oportunidade e desafio
        const opportunities = [
            { text: "Sua estratégia de otimização de custos gerou economia. +$20 de orçamento!", resourcesChange: 20 },
            { text: "Uma nova ferramenta de automação foi implementada com sucesso. +10 de Alinhamento.", alignmentChange: 10 },
            { text: "A equipe de TI concluiu um projeto complexo antes do prazo. +15 de Alinhamento.", alignmentChange: 15 },
            { text: "Um novo processo de governança melhorou a tomada de decisões. +10 de Alinhamento.", alignmentChange: 10 },
            { text: "A conformidade com regulamentações foi elogiada na auditoria. -10 de Risco.", riskChange: -10 }
        ];

        const challenges = [
            { text: "Problemas inesperados de infraestrutura custam caro. -$20 de orçamento!", resourcesChange: -20 },
            { text: "Uma falha de segurança causou uma pequena perda de dados. +15 de Risco.", riskChange: 15 },
            { text: "Um projeto-chave de TI está atrasado, afetando as metas de negócio. -10 de Alinhamento.", alignmentChange: -10 },
            { text: "Um novo requisito de segurança gerou um custo inesperado. -$15 de orçamento!", resourcesChange: -15 },
            { text: "A falta de comunicação entre TI e o negócio resultou em um projeto inútil. -15 de Alinhamento.", alignmentChange: -15 }
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
            
            updateUI();
            generateBoard();
            diceButton.addEventListener('click', rollDice);
            restartButton.addEventListener('click', initializeGame);
        }

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
            const shuffledSpaces = shuffleBoardSpaces();
            gameBoard.innerHTML = '';
            for (let i = 0; i < shuffledSpaces.length; i++) {
                const cell = document.createElement('div');
                const space = shuffledSpaces[i];
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
                    checkSpaceType(boardSpaces[position].type);
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
                    setTimeout(() => resetTurn(), 5000);
                    break;
                case 'challenge':
                    const chlg = challenges[Math.floor(Math.random() * challenges.length)];
                    eventText.textContent = chlg.text;
                    resources += (chlg.resourcesChange || 0);
                    businessAlignment += (chlg.alignmentChange || 0);
                    riskLevel += (chlg.riskChange || 0);
                    actionButtonsContainer.innerHTML = '';
                    setTimeout(() => resetTurn(), 5000);
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
                setTimeout(() => resetTurn(), 2000);
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
                maturityDescription = "A governança de TI é um processo contínuo e aperfeiçoado, com foco na inovação.";
            } else if (finalScore >= 300) {
                maturityLevel = "Gerenciado (4)";
                maturityDescription = "Os processos de governança são monitorados e medidos de forma proativa.";
            } else if (finalScore >= 250) {
                maturityLevel = "Definido (3)";
                maturityDescription = "Os processos de governança são bem documentados e comunicados em toda a organização.";
            } else if (finalScore >= 180) {
                maturityLevel = "Repetível (2)";
                maturityDescription = "As práticas de governança são consistentes, mas dependem do conhecimento individual.";
            } else if (finalScore >= 120) {
                maturityLevel = "Inicial (1)";
                maturityDescription = "Há uma abordagem informal para a governança, com pouca padronização.";
            }
            if (isWinner) {
                modalTitle.textContent = "Vitória! 🎉";
                modalMessage.textContent = `Você chegou ao fim da jornada com um Alinhamento de ${businessAlignment}, Risco de ${riskLevel} e Recursos de $${resources}. Você demonstrou uma excelente governança de TI.\n\nNível de Maturidade: ${maturityLevel}\n${maturityDescription}`;
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
