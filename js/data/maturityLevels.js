// js/data/maturityLevels.js
// Descrições dos níveis de maturidade COBIT, exibidas no modal informativo
// e usadas no cálculo final do fim de jogo (engine/gameOver.js).
window.CobitGame = window.CobitGame || {};
CobitGame.data = CobitGame.data || {};

CobitGame.data.maturityLevels = {
    'Inexistente (0)': 'A governança de TI não existe ou não é reconhecida. As decisões são tomadas de forma ad-hoc.',
    'Inicial (1)': 'Há uma abordagem informal para a governança, com pouca padronização. As práticas são reativas.',
    'Repetível (2)': 'As práticas de governança são consistentes, mas dependem do conhecimento individual. Não há processos formais documentados.',
    'Definido (3)': 'Os processos de governança são bem documentados e comunicados em toda a organização, mas a implementação pode ser inconsistente.',
    'Gerenciado (4)': 'Os processos de governança são monitorados e medidos de forma proativa. As decisões são baseadas em dados.',
    'Otimizado (5)': 'A governança de TI é um processo contínuo e aperfeiçoado, com foco na inovação e na melhoria contínua.'
};
