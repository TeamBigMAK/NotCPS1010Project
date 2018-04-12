/*script called in index.html file (though not working due to client side not able to use server side packages such as file system) */

var fs = require('fs');

function saveQuestion()
{
    var ques = document.getElementById("question_field").value;

    var question = {ques};
    
//document.getElementById("demo").innerHTML = question;
    
      fs.writeFile("./questions.json", JSON.stringify(question, null, 4), (err) =>
      {
        if (err) {
        console.error(err);
        return;
        };
        console.log("File has been created successfully ");
      });
    
//writefile:(location for file,content,callback)
//.stringify(value[,replacer[,space]])
}