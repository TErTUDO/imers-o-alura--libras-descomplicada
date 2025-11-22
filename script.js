// --- 1. ELEMENTOS DO HTML ---
const startCard = document.getElementById('start-card');
const startButton = document.getElementById('start-button');
const quizCard = document.getElementById('quiz-card');
const presentationCard = document.getElementById('presentation-card');
const playButton = document.getElementById('play-button');
const questionImage = document.getElementById('question-image');
const alternativesContainer = document.getElementById('alternatives');
const feedbackMessage = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');
const questionNumberElement = document.getElementById('question-number');

// --- 2. DADOS DO QUIZ ---
// Adicione suas perguntas aqui. Crie as imagens e coloque o caminho correto.
const questions = [
  {
    image: "https://i.pinimg.com/originals/e0/5c/ad/e05cad0eab67556e0a3f4807de42c3da.gif", // Caminho simplificado
    alternatives: ["Oi ", "Tchau", "Meu nome", "Obrigado"],
    correct: 0,
  },
  {
    image: "https://pa1.aminoapps.com/7939/4ec67b68f31685647be3e7bca06817a41d9b18d7r1-500-288_hq.gif", // Caminho simplificado
    alternatives: ["Tudo bem?", "Por favor", "Desculpa", "Sim"],
    correct: 0,
  },
  {
    image: "https://i.makeagif.com/media/5-21-2018/NddT17.gif", // Caminho simplificado
    alternatives: ["Qual sua idade?", "Onde você mora?", "Meu nome é...", "Eu gosto"],
    correct: 2,
  },
  {
    image: "https://img.passeidireto.com/material/66666197/984257d1-50cb-4609-a917-b84d6b1f665e.gif", // Caminho simplificado
    alternatives: ["De nada", "Obrigado/Obrigada", "Bom dia", "Com licença"],
    correct: 1,
  },
  {
    image: "https://moodle.ifsc.edu.br/pluginfile.php/5539/mod_glossary/entry/702/desculpa.gif", // Caminho simplificado
    alternatives: ["Com licença", "Não sei", "Desculpa", "Tudo bem"],
    correct: 2,
  },
];

// --- 3. VARIÁVEIS DO JOGO ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// --- 4. FUNÇÕES DO JOGO ---

// Função para iniciar ou ir para a próxima pergunta
function showQuestion() {
    answered = false;
    feedbackMessage.textContent = '';
    nextButton.style.display = 'none';
    alternativesContainer.innerHTML = '';

    // Checa se o quiz acabou
    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Atualiza a imagem e os textos
    questionImage.src = currentQuestion.image;
    scoreElement.textContent = `Pontos: ${score}`;
    questionNumberElement.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;

    // Cria os botões de alternativa
    currentQuestion.alternatives.forEach((alt, index) => {
        const button = document.createElement('button');
        button.textContent = alt;
        button.classList.add('btn');
        button.addEventListener('click', () => checkAnswer(index, button));
        alternativesContainer.appendChild(button);
    });
}

// Função para checar a resposta
function checkAnswer(selectedIndex, button) {
    if (answered) return; // Impede de responder duas vezes
    answered = true;

    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        score++;
        feedbackMessage.textContent = "Resposta Certa!";
        feedbackMessage.classList.add('correct');
        feedbackMessage.classList.remove('wrong');
        button.classList.add('correct');
    } else {
        feedbackMessage.textContent = "Ops, resposta errada!";
        feedbackMessage.classList.add('wrong');
        feedbackMessage.classList.remove('correct');
        button.classList.add('wrong');

        // Mostra qual era a resposta certa
        const correctButton = alternativesContainer.children[currentQuestion.correct];
        correctButton.classList.add('correct');
    }

    // Atualiza a pontuação e mostra o botão "Próxima"
    scoreElement.textContent = `Pontos: ${score}`;
    nextButton.style.display = 'block';
}

// Função para mostrar a pontuação final
function showFinalScore() {
    quizCard.innerHTML = `
        <div class="final-score">
            <h2>Fim de Jogo!</h2>
            <p>Sua pontuação foi:</p>
            <p>${score} de ${questions.length} pontos!</p>
            <button class="btn next" onclick="location.reload()">Jogar Novamente</button>
        </div>
    `;
}

// --- 5. INICIALIZAÇÃO ---

// Evento para o botão "Próxima"
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

// Evento para o botão "Começar"
startButton.addEventListener('click', () => {
    startCard.style.display = 'none'; // Esconde o card de início
    presentationCard.style.display = 'block'; // Mostra o card de apresentação
    presentationCard.style.animation = 'fadeIn 0.4s ease';
});

// Evento para o botão "Ir para o Quiz!"
playButton.addEventListener('click', () => {
    presentationCard.style.display = 'none'; // Esconde a apresentação
    quizCard.style.display = 'block';
    quizCard.style.animation = 'fadeIn 0.4s ease'; // Garante a animação
    showQuestion(); // Inicia o quiz
});