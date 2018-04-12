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
var scoreText = document.getElementById("scoreText");
var correctButtonNumber = 0; //this value is the index used to indicate which button holds the correct answer
var questionNum = -1;//-1 since nextQuestion increments this value and arrays start from 0
var totalScore = 0;
var try1Score = 10;
var try2Score = 5;
var tryNumber = 0; //used for keeping track of the number of tries (2 max)

var isAnswerCorrect = false;
var questions =[
  {
    //question : "Who wrote this?",
    article : "In January 2018 the number of tourists visiting Malta was approximately:",
    correctAnswer : "125,000",
    wrongAnswer1 : "55,000",
    wrongAnswer2 : "436,000",
    wrongAnswer3 : "1,125,000",
    articleLink : "https://nso.gov.mt/en/News_Releases/View_by_Unit/Unit_C3/Tourism_Statistics/Documents/2018/News2018_041.pdf",
  },
  {
    //question : "Now, Who wrote this question?",
    article : "Informazzjoni ufficjali dwar kemm hi l-popolazzjoni ta’ Malta",
    correctAnswer : "Fuq il-website ta’ l-NSO",
    wrongAnswer1 : "Fuq NetTV",
    wrongAnswer2 : "Fuq SuperOne",
    wrongAnswer3 : "Fuq il-website tal-Malta Broadcasting Authority",
    articleLink : "https://nso.gov.mt/en/nso/Selected_Indicators/Pages/Selected-Indicators.aspx",
  },
  {
    //question : "Who could have written this?",
    article : "Skond position paper mahruga mill-MEA, l-persentagg ta’ haddiema barranin jahdmu Malta hu ta’ madwar:",
    correctAnswer : "18%",
    wrongAnswer1 : "12%",
    wrongAnswer2 : "9%",
    wrongAnswer3 : "25%",
    articleLink : "http://www.maltaemployers.com/loadfile/2e927c34-4b4c-4526-8b35-c65df7152d8b",
  },
  {
    //question : "Who could have written this?",
    article : "Il-GDP per capita huwa numru li juri:",
    correctAnswer : "Kull persuna kemm tista tgawdi gid kull sena",
    wrongAnswer1 : "Kull persuna kemm ghandha dejn",
    wrongAnswer2 : "Kull persuna kemm hija intelligenti",
    wrongAnswer3 : "Kull persuna kemm tista taghmel kapricci",
    articleLink : "#",
  },
  {
    //question : "Who could have written this?",
    article : "It-titlu “Rosianne Cutajar tingħata kariga oħra; se tkun responsabbli mit-tnaqqis tal-Burokrazija” huwa mehud minn:",
    correctAnswer : "Midja tal-PN",
    wrongAnswer1 : "Midja tal-PL",
    wrongAnswer2 : "Midja indipendenti",
    wrongAnswer3 : "Press release ufficjali",
    articleLink : "http://netnews.com.mt/gabra/lokali/page/3/",
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
  if(isAnswerCorrect===true)
  {
  resetButtonsStyle();
  nextQuestion();
  }
});

function nextQuestion()
{
  questionNum++;
  correctButtonNumber = Math.floor(Math.random()*(3-0+1)+0);
  console.log(correctButtonNumber);
  //getting the contents of next object in the array
  question.textContent = "Question #" + (questionNum+1);
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
  overlayDescriptionText.textContent = "The correct answer is: \""+questions[questionNum].correctAnswer+"\"";
  articleLink = questions[questionNum].articleLink;
}

//responsible for diplaying the overlay after the answer
function afterAnswer()
{
  tryNumber++;
  if(isChoiceCorrect())
  {
    overlayDescriptionText.textContent = "The correct answer is: \""+questions[questionNum].correctAnswer+"\"";
    learnMoreButton.classList.remove("noShowPage");
    overlay.classList.remove("noShowPage");
    addScore();
    tryNumber = 0;
  }
  else
  {
    if(tryNumber === 2)
    {
      overlayDescriptionText.textContent = "The correct answer is: \""+questions[questionNum].correctAnswer+"\"";
      learnMoreButton.classList.remove("noShowPage");
      overlay.classList.remove("noShowPage");
      isAnswerCorrect = true;//the overlay is already shown at this point so by making correct answer true it will allow the continue button to load the next question
      tryNumber = 0;
    }
    else
    {
      overlayDescriptionText.textContent = "Try again!";
      learnMoreButton.classList.add("noShowPage");
      overlay.classList.remove("noShowPage");
    }
  }
}

function isChoiceCorrect()
{
  if(isAnswerCorrect===true)
  {
    overlayStatusText.style.color = "green";
    overlayStatusText.textContent = "Correct!";
    return true;
  }
  else
  {
    overlayStatusText.style.color = "red";
    overlayStatusText.textContent = "Wrong!";
    return false;
  }
}

function resetButtonsStyle()
{
  for(var i=0+4; i<=3+4; i++)
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

function addScore()
{
  console.log(isAnswerCorrect);
  console.log("Try: "+tryNumber);
  if((tryNumber===1) && (isAnswerCorrect===true))
  {
    totalScore += try1Score;
  }
  else if((tryNumber===2) && (isAnswerCorrect=true))
  {
    totalScore += try2Score;
  }
  console.log("Score: "+totalScore);
  scoreText.textContent = totalScore;
}
