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
var questionNum = -1;//-1 since nextQuestion increments this value and arrays start from 0
var questions =[
  {
    question : "Who wrote this?",
    article : "We (pn) didn't write this",
    correctAnswer : "pn",
    wrongAnswer1 : "pl",
    wrongAnswer2 : "zaren",
    wrongAnswer3 : "boq",
    extraInfo : "PN Said that!",
    articleLink : "www.google.com",
  },
  {
    question : "Now, Who wrote this question?",
    article : "DEFINITELY NOT PL",
    correctAnswer : "pl",
    wrongAnswer1 : "pn",
    wrongAnswer2 : "zaren",
    wrongAnswer3 : "boq",
    extraInfo : "PL said those words",
    articleLink : "www.amazon.com",
  },
  {
    question : "Who could have written this?",
    article : "ma taghmlu xejn, ma zaren ta l-ajkla",
    correctAnswer : "zaren",
    wrongAnswer1 : "pn",
    wrongAnswer2 : "pl",
    wrongAnswer3 : "boq",
    extraInfo : "this doesn't even need an explanation",
    articleLink : "www.bing.com",
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
  afterAnswer();
});

wrongButton[0].addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-danger");
  afterAnswer();
});

wrongButton[1].addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-danger");
  afterAnswer();
});

wrongButton[2].addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-danger");
  afterAnswer();
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
}

function afterAnswer()
{
  resetButtonsStyle();
  nextQuestion();
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
