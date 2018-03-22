var page1 = document.getElementById("page1");
var page2 = document.querySelector("#page2");
var playButton = document.getElementById("playButton");
var wrong = document.querySelectorAll(".wrong");
var correct = document.querySelector(".correct");

console.log(wrong,correct);
for(var i;i<wrong.length;i++)
{
  wrong[i].addEventListener("click",function(){
    console.log(this.classList);
    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-outline-danger");
  });
}

playButton.addEventListener("click", function(){
  console.log(page2);
  const clone = page2.cloneNode(true);

  while (page1.firstChild) page1.firstChild.remove();
  page1.appendChild(clone);

  page2.classList.remove("noShowPage");
});

correct.addEventListener("click", function(){
  this.classList.remove("btn-outline-dark");
  this.classList.add("btn-outline-success");
});
