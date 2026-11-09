// js/engine/gameOver.js
// Condições de fim de jogo e cálculo do nível de maturidade final.
// Observação: o game.js original duplicava o cálculo de maturidade em
// updateMaturityLevel() e em endGame(). Aqui a pontuação vem de
// CobitGame.state.calculateScore(), usada em ambos os lugares.
window.CobitGame = window.CobitGame || {};
CobitGame.engine = CobitGame.engine || {};

/** Verifica se uma condição de derrota foi atingida e encerra o jogo. */
CobitGame.engine.checkGameOver = function () {
    const s = CobitGame.state.internal;
    if (s.businessAlignment <= 0 || s.riskLevel >= 150 || s.resources <= 0) {
        CobitGame.engine.endGame(false);
    }
};

/**
 * Retorna o nível de maturidade e uma mensagem de feedback associada,
 * com base na pontuação agregada do estado atual.
 * @returns {{level:string, description:string}}
 */
CobitGame.engine.calculateMaturityFeedback = function () {
    const s = CobitGame.state.internal;
    const score = CobitGame.state.calculateScore(s);

    if (score >= 350) {
        return {
            level: "Otimizado (5)",
            description: "Você fez uma excelente governança! A governança de TI é um processo contínuo e aperfeiçoado, com foco na inovação."
        };
    } else if (score >= 300) {
        return {
            level: "Gerenciado (4)",
            description: "Você fez uma ótima governança! Os processos de governança são monitorados e medidos de forma proativa."
        };
    } else if (score >= 250) {
        return {
            level: "Definido (3)",
            description: "Você está no caminho certo! Os processos de governança são bem documentados e comunicados em toda a organização."
        };
    } else if (score >= 180) {
        return {
            level: "Repetível (2)",
            description: "Você conseguiu progredir! As práticas de governança são consistentes, mas dependem do conhecimento individual."
        };
    } else if (score >= 120) {
        return {
            level: "Inicial (1)",
            description: "Você precisa evoluir! Há uma abordagem informal para a governança, com pouca padronização."
        };
    }
    return {
        level: "Inexistente (0)",
        description: "A governança de TI não existe ou não é reconhecida."
    };
};

/** Exibe o modal de fim de jogo. */
CobitGame.engine.endGame = function (isWinner) {
    const dom = CobitGame.dom;
    const s = CobitGame.state.internal;

    dom.gameOverModal.classList.remove('hidden');
    dom.gameOverModal.classList.add('flex');

    const feedback = CobitGame.engine.calculateMaturityFeedback();

    if (isWinner) {
        dom.modalTitle.textContent = "Fim da jornada! 🎉";
        dom.modalMessage.textContent =
            'Você chegou ao fim da jornada com um Alinhamento de ' + s.businessAlignment +
            ', Risco de ' + s.riskLevel + ' e Recursos de $' + s.resources + '.\n\n' +
            'Nível de Maturidade: ' + feedback.level + '\n' + feedback.description;
    } else {
        dom.modalTitle.textContent = "Game Over... 😔";
        let message = '';
        if (s.businessAlignment <= 0) {
            message = "O alinhamento com o negócio chegou a zero. A TI perdeu a confiança da empresa. Tente novamente!";
        } else if (s.riskLevel >= 150) {
            message = "O nível de risco se tornou inaceitável. A falta de controles de TI causou sérios problemas. Tente novamente!";
        } else if (s.resources <= 0) {
            message = "Você ficou sem recursos para tomar decisões críticas. A falta de orçamento comprometeu a governança de TI. Tente novamente!";
        }
        dom.modalMessage.textContent = message;
    }

    dom.diceButton.disabled = true;
};
