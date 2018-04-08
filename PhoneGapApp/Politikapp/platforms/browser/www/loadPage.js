var page1 = document.getElementById("page1");
var page2 = document.querySelector("#page2");
var playButton = document.getElementById("playButton");
/*var wrong1 = document.getElementById("wrongAnswer1");
var wrong2 = document.getElementById("wrongAnswer2");
var wrong3 = document.getElementById("wrongAnswer3");
var correct = document.getElementById("correctAnswer");
/*var wrongButton = document.getElementsByClassName("wrongButton")
var correctButton = document.getElementById("correctButton");*/
var question = document.getElementById("questionName");
var article = document.getElementById("article");
var buttons = document.getElementsByClassName("buttonChoice");
var buttonText = document.getElementsByClassName("buttonText");
var overlay = document.getElementById("overlay");
var overlayStatusText = document.getElementById("overlayStatusText");
var overlayDescription = document.getElementById("overlayDescriptionText");
var learnMoreButton = document.getElementById("learnMore");
var continueButton = document.getElementById("Continue");
var correctButtonNumber = 0; //this value is the index used to indicate which button holds the correct answer
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

//NOTE: For some reason, javascript is reading 8 buttonTexts instead of 4 so wherever there is a +4 this means that the program is concerned with the last 4
//buttons and not the first 4 (since the first 4 are not displaying anything). I know this is a workaround not a solution but it works so shut up.


//Adding event listeners to the different buttons
playButton.addEventListener("click", function(){
  //console.log(page2);
  const clone = page2.cloneNode(true);
  while (page1.firstChild) page1.firstChild.remove();
  page1.appendChild(clone);
  nextQuestion();

  page2.classList.remove("noShowPage");
});


buttons[0].addEventListener("click", function(){
  if(correctButtonNumber+4===0+4)
  {
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-success");
    isAnswerCorrect=true;
  }
  else
  {
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-danger");
    isAnswerCorrect = false;
  }
  afterAnswer();
});

buttons[1].addEventListener("click", function(){
  if(correctButtonNumber+4===1+4)
  {
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-success");
    isAnswerCorrect=true;
  }
  else{
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-danger");
    isAnswerCorrect = false;
  }
  afterAnswer();
});

buttons[2].addEventListener("click", function(){
  if(correctButtonNumber+4===2+4)
  {
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-success");
    isAnswerCorrect=true;
  }
  else{
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-danger");
    isAnswerCorrect = false;
  }
  afterAnswer();
});

buttons[3].addEventListener("click", function(){
  if(correctButtonNumber+4===3+4)
  {
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-success");
    isAnswerCorrect=true;
  }
  else{
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-danger");
    isAnswerCorrect = false;
  }
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
  correctButtonNumber = Math.floor(Math.random()*(3-0+1)+0);
  console.log(correctButtonNumber);
  //getting the contents of next object in the array
  question.textContent = questions[questionNum].question;
  article.textContent = questions[questionNum].article;
  buttonText[correctButtonNumber+4].textContent = questions[questionNum].correctAnswer;
  //setting the content of the other buttons depending on what was generated
  console.log(buttonText);
  switch(correctButtonNumber)
  {
    case 0:{
    buttonText[1+4].textContent = questions[questionNum].wrongAnswer1;
    buttonText[2+4].textContent = questions[questionNum].wrongAnswer2;
    buttonText[3+4].textContent = questions[questionNum].wrongAnswer3;
  };break;
  case 1:{
    buttonText[0+4].textContent = questions[questionNum].wrongAnswer1;
    buttonText[2+4].textContent = questions[questionNum].wrongAnswer2;
    buttonText[3+4].textContent = questions[questionNum].wrongAnswer3;
  };break;
  case 2:{
    buttonText[0+4].textContent = questions[questionNum].wrongAnswer1;
    buttonText[1+4].textContent = questions[questionNum].wrongAnswer2;
    buttonText[3+4].textContent = questions[questionNum].wrongAnswer3;
  };break;
  case 3:{
    buttonText[0+4].textContent = questions[questionNum].wrongAnswer1;
    buttonText[1+4].textContent = questions[questionNum].wrongAnswer2;
    buttonText[2+4].textContent = questions[questionNum].wrongAnswer3;
  };break;
  default: console.log("Number generated was invalid");
}

  overlayDescriptionText.textContent = questions[questionNum].extraInfo;
  articleLink = questions[questionNum].articleLink;
}

//responsible for diplaying the overlay after the answer
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
  for(var i=0+4; i<3+4; i++)
  {
    if(i===correctButtonNumber)
    {
      buttons[i].classList.remove("btn-outline-success");
      buttons[i].classList.add("btn-outline-dark");
    }
    else
    {
      buttons[i].classList.remove("btn-outline-danger");
      buttons[i].classList.add("btn-outline-dark");
    }
  }
}
