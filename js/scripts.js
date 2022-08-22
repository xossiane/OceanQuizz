// declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c","d"];
let points = 0;
let actualQuestion = 0;


//Perguntas
const questions = [
  {
    "question": "As pessoas sempre conviveram com a ideia de que o mundo era constituído por cinco oceanos. No entanto, conforme as classificações mais recentes, existem apenas três oceanos no mundo. Assinale a alternativa que indica corretamente os seus respectivos nomes:",
    "answers": [
      {
        "answer": "Glacial Ártico, Índico e Pacífico",
        "correct": false
      },
      {
        "answer": "Glacial Antártico, Atlântico e Índico",
        "correct": false
      },
      {
        "answer": "Pacífico, Atlântico e Índico",
        "correct": true
      },
      {
        "answer": "Glacial Ártico, Glacial Antártico e Atlântico",
        "correct": false
      },
    ]
  },
  {
    "question": "Assinale a alternativa que não aponta uma importância dos oceanos para a Terra ou para os seres vivos:",
    "answers": [
      {
        "answer": "Dentre os elementos terrestres, são os oceanos os maiores responsáveis por influenciar os climas do planeta.",
        "correct": false
      },
      {
        "answer": "Os oceanos funcionam como indicativos químicos e biológicos das condições biológicas e climáticas.",
        "correct": false
      },
      {
        "answer": "É nos oceanos que há a maior absorção de CO2 da atmosfera, através da fotossíntese realizada pelos plâncton e algas marinhas",
        "correct": false
      },
      {
        "answer": "Os oceanos são os responsáveis pela abundância de água para as atividades humanas relacionadas com o consumo dessa substância pelo organismo.",
        "correct": true
      },
    ]
  },
  {
    "question": "A condição natural que assegura ao Peru uma posição de destaque na indústria pesqueira mundial é:",
    "answers": [
      {
        "answer": "a farta rede hidrográfica.",
        "correct": false
      },
      {
        "answer": "o relevo acidentado.",
        "correct": false
      },
      {
        "answer": "a corrente marítima de Humboldt",
        "correct": true
      },
      {
        "answer": "o clima tropical úmido.",
        "correct": false
      },
    ]
  },
]

//Substituiçao do quizz para a primeira pergunta
function init() {
  //criar a primeira pergunta
  createQuestion(0);
  console.log("iniciou!")
}

//funcao que cria uma pergunta
function createQuestion(i){


  //limpa a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");
  oldButtons.forEach(function(btn){
    btn.remove();
  }
  );

  //Alterar o texto da pergunta

  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  //insere as alternativas
  questions[i].answers.forEach(function(answer,i){


    //cria o template do botão do quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");
    

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];
    
    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    //Remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    //Inserir a alternativa
    answersBox.appendChild(answerTemplate);
    
    //Inserir um evento de click no botão
    answerTemplate.addEventListener("click", function(){
      checkAnswer(this);
    })

  })

  //Incrementar o número da questão
  actualQuestion++;

}

//Verificando resposta do usuário
function checkAnswer(btn){

  //seleciona todos os botões
  const buttons = answersBox.querySelectorAll("button");

  //verifica se a resposta está correta e adiciona classe nos botões

  buttons.forEach(function(button){
    if(button.getAttribute("correct-answer") === "true"){
      button.classList.add("correct-answer")

      //checa se o usuário acertou a pergunta
      if(btn === button){
        //incremento dos pontos
        points++;
      }



    } else {
      button.classList.add("wrong-answer")
    }


  })

  //Exibir a próxima pergunta
  nextQuestion();
}

function nextQuestion(){


  //timer para usuário ver as respostas
  setTimeout(function(){
    //verifica se ainda há perguntas
    if(actualQuestion >= questions.length){
      //apresenta a msg de sucesso
      showSucessMessage();
      return;
    }

    createQuestion(actualQuestion)

  },700)}
  console.log(points)



//Exibe a tela final

function showSucessMessage(){
  hideOrshowQuizz();
  //trocar dados da tela de sucesso
  //calcula score
  const score = ((points/questions.length)*100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");
  displayScore.textContent = score.toString();

  //alterar o numero de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  //alterar o total de perguntas
  const totalQuestions = document.querySelector("questions-qty");
  totalQuestions.textContent = questions.length;
}

//mostra a pontuação do quizz

function hideOrshowQuizz(){
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

//reiniciar quizz

const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
  //zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrshowQuizz(); 
  init();
})

//inicialização de quizz
init();