var page1 = document.getElementById("page1");
var page2 = document.querySelector("#page2");
var playButton = document.getElementById("playButton");
var wrong1 = document.getElementById("wrongAnswer1");
var wrong2 = document.getElementById("wrongAnswer2");
var wrong3 = document.getElementById("wrongAnswer3");
var correct = document.getElementById("correctAnswer");
var question = document.getElementById("questionName");
var article = document.getElementById("article");
var wrongButton = document.getElementsByClassName("wrongButton")
var correctButton = document.getElementById("correctButton");
var overlay = document.getElementById("overlay");
var overlayStatusText = document.getElementById("overlayStatusText");
var overlayDescription = document.getElementById("overlayDescriptionText");
var learnMoreButton = document.getElementById("learnMore");
var continueButton = document.getElementById("Continue");
var questionNum = -1;//-1 since nextQuestion increments this value and arrays start from 0
var isAnswerCorrect = false;
var questions =[
  {
    question : "Who wrote this?",
    article : "We (pn) didn't write this",
    correctAnswer : "pn",
    wrongAnswer1 : "pl",
    wrongAnswer2 : "zaren",
    wrongAnswer3 : "boq",
    extraInfo : "PN Said that!",
    articleLink : "https://www.google.com",
  },
  {
    question : "Now, Who wrote this question?",
    article : "DEFINITELY NOT PL",
    correctAnswer : "pl",
    wrongAnswer1 : "pn",
    wrongAnswer2 : "zaren",
    wrongAnswer3 : "boq",
    extraInfo : "PL said those words",
    articleLink : "https://www.amazon.com",
  },
  {
    question : "Who could have written this?",
    article : "ma taghmlu xejn, ma zaren ta l-ajkla",
    correctAnswer : "zaren",
    wrongAnswer1 : "pn",
    wrongAnswer2 : "pl",
    wrongAnswer3 : "boq",
    extraInfo : "this doesn't even need an explanation",
    articleLink : "https://www.bing.com",
  }
];

console.log(wrong1,wrong2,wrong3,correct);
/*for(var i;i<wrongButton.length;i++)
{
  wrongButton[i].addEventListener("click",function(){
    console.log(this.classList);
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-danger");
  });
}*/

playButton.addEventListener("click", function(){
  //console.log(page2);
  const clone = page2.cloneNode(true);
  while (page1.firstChild) page1.firstChild.remove();
  page1.appendChild(clone);
  nextQuestion();
  page2.classList.remove("noShowPage");
});

correctButton.addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-success");
  isAnswerCorrect = true;
  afterAnswer();
});

wrongButton[0].addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-danger");
  isAnswerCorrect = false;
  afterAnswer();
});

wrongButton[1].addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-danger");
  isAnswerCorrect = false;
  afterAnswer();
});

wrongButton[2].addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-danger");
  isAnswerCorrect = false;
  afterAnswer();
});

learnMoreButton.addEventListener("click", function(){
  window.open(questions[questionNum].articleLink);
});

continueButton.addEventListener("click", function(){
  overlay.classList.add("noShowPage");
  resetButtonsStyle();
  nextQuestion();
});

function nextQuestion()
{
  questionNum++;
  question.textContent = questions[questionNum].question;
  article.textContent = questions[questionNum].article;
  correct.textContent = questions[questionNum].correctAnswer;
  wrong1.textContent = questions[questionNum].wrongAnswer1;
  wrong2.textContent = questions[questionNum].wrongAnswer2;
  wrong3.textContent = questions[questionNum].wrongAnswer3;
  overlayDescriptionText.textContent = questions[questionNum].extraInfo;
  articleLink = questions[questionNum].articleLink;
}

function afterAnswer()
{
  if(isAnswerCorrect===true)
  {
      overlayStatusText.style.color = "green";
      overlayStatusText.textContent = "Correct!";
  }
  else
  {
    overlayStatusText.style.color = "red";
    overlayStatusText.textContent = "Wrong!";
  }
  overlayDescriptionText.textContent = questions[questionNum].extraInfo;
  overlay.classList.remove("noShowPage");
}

function resetButtonsStyle()
{
  correctButton.classList.remove("btn-outline-success");
  correctButton.classList.add("btn-outline-dark");
  for(var i=0; i<wrongButton.length; i++)
  {
    wrongButton[i].classList.remove("btn-outline-danger");
    wrongButton[i].classList.add("btn-outline-dark");
  }
}
