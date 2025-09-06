const quiz = [
      {
        question: "O que é HTML?",
        answers: [
          { text: "Uma linguagem de programação", correct: false },
          { text: "Uma linguagem de marcação", correct: true },
          { text: "Um banco de dados", correct: false }
        ]
      },
      {
        question: "Qual destas é uma responsabilidade do Front-end?",
        answers: [
          { text: "Gerenciar o banco de dados", correct: false },
          { text: "Criar a interface do usuário", correct: true },
          { text: "Programar o servidor", correct: false }
        ]
      },
      {
        question: "Quais são as três principais tecnologias do Front-end?",
        answers: [
          { text: "Python, Java e C++", correct: false },
          { text: "HTML, SQL e Java", correct: false },
          { text: "HTML, CSS e JavaScript", correct: true }
        ]
      }
    ];

let currentQuestion = 0;

    function showQuestion() {
      const q = quiz[currentQuestion];
      document.getElementById("question").textContent = q.question;
      const answersDiv = document.getElementById("answer-buttons");
      answersDiv.innerHTML = "";

      q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => checkAnswer(answer.correct);
        answersDiv.appendChild(btn);
      });

      document.getElementById("result").textContent = "";
    }

    function checkAnswer(correct) {
      if (correct) {
        currentQuestion++;
        if (currentQuestion < quiz.length) {
          showQuestion();
        } else {
          document.getElementById("quiz").innerHTML = `
            <h2>🎉 Parabéns! Você completou o quiz! 🎉</h2>
            <img src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif" alt="Victory" style="width:300px; display:block; margin:auto;">
            <button onclick="restartQuiz()">Jogue Novamente!</button>
          `;
          document.getElementById("winSound").play();
        }
      } else {
        dramaTime();
      }
    }

    function dramaTime() {
      const container = document.getElementById("quiz");
      const errorSound = document.getElementById("errorSound");

      // Play sounds
      errorSound.currentTime = 0;
      errorSound.play();

      // Shake effect
      container.classList.add("shake");

      // Explosion effect
      const explosion = document.createElement("div");
      explosion.className = "explosion";
      document.body.appendChild(explosion);
      setTimeout(() => explosion.remove(), 1000);

      // Reset after shake
      setTimeout(() => {
        container.classList.remove("shake");
        alert("💥 Você errou! Que pena! Voltando ao início do quiz...");
        currentQuestion = 0;
        showQuestion();
      }, 1000);
    }

    function restartQuiz() {
      currentQuestion = 0;
      showQuestion();
    }

    showQuestion();