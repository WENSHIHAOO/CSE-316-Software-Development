import Model from './model.js';

window.onload = function() {
  // write relevant code.
  let date = new Date();
  let model = new Model();
  let questions= model.data.questions;
  questions = questions.sort(function(a, b){ 
    if(Date.parse(a.askedOn+' '+ a.askedAt)>Date.parse(b.askedOn+' '+ b.askedAt)){return 1} else{return -1}
  });

  let answers = model.data.answers;
  let tags = model.data.tags;
  let N = questions.length;
  let tTT=0;
  //All Questions Page//
  N_Question();
  let nQuestion = document.getElementById("Question");
  nQuestion.onclick = function(){
    N_Question();
  }
  function N_Question(){
    hideFunc(1, 1, 0, 0, 0, 0);

    document.getElementById("Tags").style.backgroundColor = "lightgray";
    document.getElementById("Question").style.backgroundColor = "#0281E8";
    document.getElementById("N_Question").innerHTML = "";
    document.getElementById("N").innerHTML = N+" Qustions";
    document.getElementById("All").innerHTML = "All Questions";
    for(let i=N-1; i>=0; i--){
      tTT=0;
      document.getElementById("N_Question").innerHTML += 
      "<table><tr><td class=\"column1\">"+questions[i].views+ " Views</td>"+ 
      "<td class=\"column2\"> <a href=\"#"+questions[i].qid+"\">"+questions[i].title+"</a></td>"+
      "<td class=\"column3\"> Asked By <span style=\"color: blue;\">"+questions[i].askedBy+"</span></td></tr>"+
      "<tr><td class=\"column1\" rowspan=\"2\">"+questions[i].answers.length+ " Answers</td>"+ 
      "<td class=\"column2\" rowspan=\"2\">"+questions[i].tagIds.map(tagIdToTag).join(" ")+"</td>"+
      "<td class=\"column3\"> On <span style=\"color: green;\">"+questions[i].askedOn+"</span></td></tr>"+
      "<td class=\"column3\"> At <span style=\"color: darkcyan;\">"+questions[i].askedAt+"</span></td></tr></table><hr>"
  }
}


  function tagIdToTag(value){
    for(let i=0; i<tags.length; i++){
      if(tags[i].tid == value){
        tTT++;
        if(tTT%4==0){
          return "<span class=\"name\">"+tags[i].name+" </span><br>";
        }
        return "<span class=\"name\">"+tags[i].name+" </span>";
      }
    }
    return;
  }


  //New Question Page//
  let Ask_A_Question = document.getElementById("Ask");
  Ask_A_Question.onclick = function(){
    document.getElementById("Tags").style.backgroundColor = "lightgray";
    document.getElementById("Question").style.backgroundColor = "lightgray";
    document.getElementById("Alert").innerHTML = "";
    hideFunc(0, 0, 1, 1, 0, 0);
  }

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  let submit = document.getElementById("submit");
  submit.onclick = function(){ 
    let Atitle = document.getElementById("title").value;
    let Adetail = document.getElementById("detail").value;
    let Akeyword = document.getElementById("keyword").value.split(" ");
    let Ausername = document.getElementById("username").value;

    if (Atitle.trim() == "") {  
     document.getElementById("Alert").innerHTML = "Titile should not be empty.";
     document.getElementById("title").focus();  
     return; 
    }
    else if(Atitle.length > 100){
      document.getElementById("Alert").innerHTML = "Titile should not be more than 100 characters.";
      document.getElementById("title").focus(); 
    }
    if (Adetail.trim() == "") {  
      document.getElementById("Alert").innerHTML = "Detail should not be empty.";
      document.getElementById("detail").focus();  
      return; 
     }
    if (document.getElementById("keyword").value.length == 0) {  
      document.getElementById("Alert").innerHTML = "Keyword should not be empty.";
      document.getElementById("keyword").focus();  
      return; 
     }
    if (Ausername.trim() == "") {  
      document.getElementById("Alert").innerHTML = "Username should not be empty.";
      document.getElementById("username").focus();  
      return; 
     }
     else if(Ausername.length > 15){
      document.getElementById("Alert").innerHTML = "Username should not be more than 15 characters.";
      document.getElementById("username").focus(); 
    }
     N++;
     document.getElementById("title").value="";
     document.getElementById("detail").value="";
     document.getElementById("keyword").value="";
     document.getElementById("username").value="";

     let akey = repeat(Akeyword);
     let Akey = akey.map(tagToTagId);
     const dataQuestion = {
       qid: 'q'+ N,
       title: Atitle,
       text: Adetail,
       tagIds: Akey,
       askedBy : Ausername,
       askedOn: month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear(),
       askedAt: date.getHours()+":"+date.getMinutes(),
       answers:[],
       views: 0,
     }

    function repeat(t){
      let aKey=[];
      for(let i=0; i<t.length; i++){
        if(t[i] == ""){
          continue;
        }
        if(aKey.indexOf(t[i]) == -1){
          aKey.push(t[i]);
        }
      }
      return aKey;
    }

    function tagToTagId(tag){
       for(let i=0; i<tags.length; i++){
         if(tags[i].name==tag){
           return tags[i].tid;
         }
       }
       
        const dataTag = {
        tid: 't'+(tags.length+1),
        name: tag,
        }
        model.newTag(dataTag);
        return 't'+(tags.length);
     }
    model.newQuestion(dataQuestion);
    N_Question();
  }

  //Answers Page//
  let index =0;
  let answer = document.getElementById("N_Question");
   answer.onclick=function(f){ 
    let a =f.target+"";

    if(a.charAt(a.length-1)=="]"){
      return;
    }
    
    if(a.includes("#q")){
      document.getElementById("Tags").style.backgroundColor = "lightgray";
      document.getElementById("Question").style.backgroundColor = "lightgray";
      let q="q"+a.substring(a.indexOf("#q")+2);
      for(let i=0; i<questions.length; i++){
        if(questions[i].qid == q){
          index = i;
          nAnswer(index);
        }
      }
    }
    else if(a.includes("#t")){
      document.getElementById("Tags").style.backgroundColor = "lightgray";
      document.getElementById("Question").style.backgroundColor = "lightgray";
      tQuestion(a.substring(a.indexOf("#t")+2));
    }
    else{
      return;
    }
  }

  function nAnswer(index){
    hideFunc(1, 1, 0, 0, 1, 0);
    questions[index].views++;
    document.getElementById("N").innerHTML = questions[index].answers.length + " Answers" ;
    document.getElementById("All").innerHTML = questions[index].title;
    document.getElementById("N_Question").innerHTML = 
    "<table><tr><td class=\"column1\" rowspan=\"3\">"+questions[index].views+ " Views</td>"+
    "<td class=\"column2\" rowspan=\"3\">"+questions[index].text +"</td>"+
    "<td class=\"column3\"> Asked By <span style=\"color: blue;\">"+questions[index].askedBy+"</span></td></tr>"+
    "<td class=\"column3\"> On <span style=\"color: green;\">"+questions[index].askedOn+"</span></td></tr>"+
    "<td class=\"column3\"> At <span style=\"color: darkcyan;\">"+questions[index].askedAt+"</span></td></tr></table><hr>"

    for(let i=0; i<questions[index].answers.length; i++){
      for(let j=0; j<answers.length; j++){
        if(questions[index].answers[i] == answers[j].aid){
          document.getElementById("N_Question").innerHTML += 
          "<table><tr><td style=\"width: 80%;\" rowspan=\"3\">"+answers[j].text+ "</td>"+ 
          "<td class=\"column3\"> Asked By <span style=\"color: blue;\">"+answers[j].ansBy+"</span></td></tr>"+
          "<td class=\"column3\"><pre>On <span style=\"color: green;\">"+answers[j].ansOn+
          "</span>\nAt <span style=\"color: darkcyan;\">"+answers[j].ansAt+"</span></td></tr></table><hr>"
        }
      }
    }
  }


  //New Answer Page//
  let newAnswer = document.getElementById("newAnswer");
  newAnswer.onclick = function(){
    hideFunc(0, 0, 1, 0, 0, 1);
    document.getElementById("Alert").innerHTML ="";
  }

  let aPost = document.getElementById("aPost");
  aPost.onclick = function(){ 
    let aText = document.getElementById("aText").value;
    let aUsername = document.getElementById("aUsername").value;

    if (aText.trim() == "") {  
      document.getElementById("Alert").innerHTML = "Text should not be empty.";
      document.getElementById("aText").focus();  
      return; 
     }
    if (aUsername.trim() == "") {  
      document.getElementById("Alert").innerHTML = "Username should not be empty.";
      document.getElementById("aUsername").focus();  
      return; 
     }
     else if(aUsername.length > 15){
      document.getElementById("Alert").innerHTML = "Username should not be more than 15 characters.";
      document.getElementById("aUsername").focus(); 
    }
    document.getElementById("aText").value="";
    document.getElementById("aUsername").value="";

     const dataAnswer = {
       aid: 'a'+ (answers+1),
       text: aText,
       ansBy : aUsername,
       ansOn: month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear(),
       ansAt: date.getHours()+":"+date.getMinutes(),
     }

    model.newAnswer(index,dataAnswer);
    nAnswer(index);
  }


  //Tags Page//
  let clickTags = document.getElementById("Tags");
  clickTags.onclick = function(){ 
    hideFunc(1, 1, 0, 0, 0, 0);
    document.getElementById("Tags").style.backgroundColor = "#0281E8";
    document.getElementById("Question").style.backgroundColor = "lightgray";

    document.getElementById("N").innerHTML = tags.length + " Tags" ;
    document.getElementById("All").innerHTML = "All Tags";

    let n = new Array(tags.length).fill(0);
    for(let i=0; i<questions.length; i++){
      for(let j=0; j<questions[i].tagIds.length; j++){
        n[questions[i].tagIds[j].substring(1)-1]++;
      }
    }
    document.getElementById("N_Question").innerHTML ="";
    for(let l=0; l<tags.length; l++){
      if((l+1)%3==0){
        document.getElementById("N_Question").innerHTML +=
        "<div class=\"tags\"><a href=\"#"+tags[l].tid+"\">"+tags[l].name+"</a></br></br>"+n[l]+" question</div></br>";
      }
      else{
        document.getElementById("N_Question").innerHTML +=
        "<div class=\"tags\"><a href=\"#"+tags[l].tid+"\">"+tags[l].name+"</a></br></br>"+n[l]+" question</div>";
      }
    }
  }

  function tQuestion(tIndex){
    hideFunc(1, 1, 0, 0, 0, 0);
    document.getElementById("Tags").style.backgroundColor = "lightgray";
    document.getElementById("N_Question").innerHTML = "";
    document.getElementById("All").innerHTML = "Questions tagged ["+tags[tIndex-1].name+"]";
    let number = 0;
    let tI = "t"+tIndex;

    for(let i=N-1; i>=0; i--){
      for(let j=0; j<questions[i].tagIds.length; j++){
        if(questions[i].tagIds[j] == tI){
          number++;
      document.getElementById("N_Question").innerHTML += 
      "<table><tr><td class=\"column1\">"+questions[i].views+ " Views</td>"+ 
      "<td class=\"column2\"> <a href=\"#"+questions[i].qid+"\">"+questions[i].title+"</a></td>"+
      "<td class=\"column3\"> Asked By "+questions[i].askedBy+"</td></tr>"+
      "<tr><td class=\"column1\" rowspan=\"2\">"+questions[i].answers.length+ " Answers</td>"+ 
      "<td class=\"column2\" rowspan=\"2\">"+questions[i].tagIds.map(tagIdToTag).join(" ")+"</td>"+
      "<td class=\"column3\"> On "+questions[i].askedOn+"</td></tr>"+
      "<td class=\"column3\"> At "+questions[i].askedAt+"</td></tr></table><hr>"
        }
      }
    }
  document.getElementById("N").innerHTML = number+" Qustions";
}


//Searching//
  let search = document.getElementById("search");
  search.onkeydown = function(k){
    if(k.key == "Enter"){
      hideFunc(1, 1, 0, 0, 0, 0);
      document.getElementById("Question").style.backgroundColor = "lightgray";
      document.getElementById("Tags").style.backgroundColor = "lightgray";
      document.getElementById("N_Question").innerHTML = "";
      document.getElementById("All").innerHTML = "Search Results";

      let aSearch = document.getElementById("search").value.split(" ");
      let nSearch = new Array(answers.length).fill(0);
      for(let i=0; i<aSearch.length; i++){
      if(aSearch[i].charAt(0)=="["){
          let sString = aSearch[i].substring(1, aSearch[i].length-1);
          for(let j=0; j<tags.length; j++){
            if(tags[j].name.toLowerCase() == sString.toLowerCase()){
              let tag = tags[j].tid;
              for(let x=0; x<questions.length; x++){
                for(let y=0; y<questions[x].tagIds.length; y++){
                  if(questions[x].tagIds[y]==tag){
                    nSearch[x]++;

                    break;
                  }
                }
              }

              break;
            }
          }
      }
      else{
          for(let j=0; j<questions.length; j++){
            if(questions[j].title.toLowerCase().indexOf(aSearch[i].toLowerCase()) != -1){
              nSearch[j]++;
            }
            else if(questions[j].text.toLowerCase().indexOf(aSearch[i].toLowerCase()) != -1){
              nSearch[j]++;
            }
          }
        }
      }
      document.getElementById("search").value="";

      let number = aS(nSearch);
      if(number==0){
        document.getElementById("N_Question").innerHTML = "<h1 style=\"text-align: center; color: red;\" >No Questions Found.</h1>"
      }

      document.getElementById("N").innerHTML = number+" Qustions";
    }
  }

  function aS(nS){
    let number =0;
    for(let i=nS.length-1; i>=0; i--){
      if(nS[i] != 0){
        number++;
      document.getElementById("N_Question").innerHTML += 
      "<table><tr><td class=\"column1\">"+questions[i].views+ " Views</td>"+ 
      "<td class=\"column2\"> <a href=\"#"+questions[i].qid+"\">"+questions[i].title+"</a></td>"+
      "<td class=\"column3\"> Asked By "+questions[i].askedBy+"</td></tr>"+
      "<tr><td class=\"column1\" rowspan=\"2\">"+questions[i].answers.length+ " Answers</td>"+ 
      "<td class=\"column2\" rowspan=\"2\">"+questions[i].tagIds.map(tagIdToTag).join(" ")+"</td>"+
      "<td class=\"column3\"> On "+questions[i].askedOn+"</td></tr>"+
      "<td class=\"column3\"> At "+questions[i].askedAt+"</td></tr></table><hr>"
      }
    }
    return number;
  }


  function hideFunc(row1, N_Question, Alert, AskAQuestion, newAnswer, answerText){
    if(row1 == 0){
      if(document.getElementById("row1").style.display != "none"){
        document.getElementById("row1").style.display = "none";
      }
    }
    else{
      if(document.getElementById("row1").style.display == "none"){
        document.getElementById("row1").style.display = "";
      }
    }

    if(N_Question == 0){
      if(document.getElementById("N_Question").style.display != "none"){
        document.getElementById("N_Question").style.display = "none";
      }
    }
    else{
      if(document.getElementById("N_Question").style.display == "none"){
        document.getElementById("N_Question").style.display = "";
      }
    }

    if(Alert == 0){
      if(document.getElementById("Alert").style.display != "none"){
        document.getElementById("Alert").style.display = "none";
      }
    }
    else{
      if(document.getElementById("Alert").style.display == "none"){
        document.getElementById("Alert").style.display = "";
      }
    }

    if(AskAQuestion == 0){
      if(document.getElementById("AskAQuestion").style.display != "none"){
        document.getElementById("AskAQuestion").style.display = "none";
      }
    }
    else{
      if(document.getElementById("AskAQuestion").style.display == "none"){
        document.getElementById("AskAQuestion").style.display = "";
      }
    }

    if(newAnswer == 0){
      if(document.getElementById("newAnswer").style.display != "none"){
        document.getElementById("newAnswer").style.display = "none";
      }
    }
    else{
      if(document.getElementById("newAnswer").style.display == "none"){
        document.getElementById("newAnswer").style.display = "";
      }
    }
    
    if(answerText == 0){
      if(document.getElementById("answerText").style.display != "none"){
        document.getElementById("answerText").style.display = "none";
      }
    }
    else{
      if(document.getElementById("answerText").style.display == "none"){
        document.getElementById("answerText").style.display = "";
      }
    }
  }
}