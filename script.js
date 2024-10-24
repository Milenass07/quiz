const questions = {
    easy: [
        { question: "Qual desses animais é um mamífero?", options: ["Cobra", "Golfinho", "Pinguim", "Sapo"], correct: 1, image: "imagem.png" },
        { question: "Qual é o maior animal terrestre?", options: ["Elefante", "Tigre", "Girafa", "Leão"], correct: 0, image: "imagem.png" },
        { question: "Qual desses animais pode voar?", options: ["Galinha", "Pato", "Águia", "Pinguim"], correct: 2, image: "imagem.png" }
    ],
    medium: [
        { question: "Quantos corações possui um polvo?", options: ["1", "2", "3", "4"], correct: 2, image: "imagem.png" },
        { question: "Qual é o animal mais rápido do mundo?", options: ["Chita", "Falcão-peregrino", "Tubarão-branco", "Cavalo"], correct: 1, image: "imagem.png" },
        { question: "Qual desses animais é conhecido por dormir de cabeça para baixo?", options: ["Coruja", "Morcego", "Koala", "Panda"], correct: 1, image: "imagem.png" }
    ],
    hard: [
        { question: "Quantas espécies de tubarões existem aproximadamente?", options: ["100", "200", "300", "500"], correct: 3, image: "imagem.png" },
        { question: "Qual é a maior espécie de ave em peso?", options: ["Condor", "Ema", "Avestruz", "Albatroz"], correct: 2, image: "imagem.png" },
        { question: "Qual é a única espécie de mamífero capaz de voar?", options: ["Morcego", "Esquilo-voador", "Gambá", "Ornitorrinco"], correct: 0, image: "imagem.png" }
    ]
};

let currentQuestion = 0;
let selectedDifficulty = '';
let timerInterval;

function startQuiz(difficulty) {
    selectedDifficulty = difficulty;
    currentQuestion = 0;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const questionSet = questions[selectedDifficulty];
    if (currentQuestion < questionSet.length) {
        const questionObj = questionSet[currentQuestion];
        document.getElementById('animal-image').src = questionObj.image;
        document.getElementById('question-text').textContent = questionObj.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        questionObj.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.onclick = () => checkAnswer(index, questionObj.correct);
            optionsContainer.appendChild(optionElement);
        });

        startTimer();
    } else {
        alert("Parabéns! Você completou o quiz.");
        resetQuiz();
    }
}

function checkAnswer(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.option');
    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add('correct');
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1000);
    } else {
        options[selectedIndex].classList.add('wrong');
        setTimeout(() => resetQuiz(), 1000);
    }
}

function startTimer() {
    let timeRemaining = 30;
    document.getElementById('time').textContent = timeRemaining;

    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('time').textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            resetQuiz();
        }
    }, 1000);
}

function resetQuiz() {
    clearInterval(timerInterval);
    alert('Você foi redirecionado ao menu inicial.');
    document.getElementById('menu').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
}
