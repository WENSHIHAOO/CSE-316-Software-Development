let Question = require('./Question');
let Tag = require('./Tag');

async function onkey(connection1, connection2, searchText){
  let tags = '';
  await Tag.get_all_tag(connection1).then((re) => tags = re);
  let questions = '';
  await Question.get_all_question(connection2).then((re) => questions=re);
  let aSearch = searchText.split(" ");
  let nSearch = new Array(questions.length).fill(0);
  for(let i=0; i<aSearch.length; i++){
  if(aSearch[i].charAt(0)=="[" && aSearch[i].charAt(aSearch[i].length-1)=="]"){
    let sString = aSearch[i].substring(1, aSearch[i].length-1);
    for(let j=0; j<tags.length; j++){
        if(tags[j].name.toLowerCase() == sString.toLowerCase()){
          let tag = tags[j]._id;
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
    console.log(questions[0].text);
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

  const N=[]
  for(let i=nSearch.length-1; i>=0; i--){
      if(nSearch[i] != 0){
          N.push(questions[i]);
      }
  }

  N.sort(function(a, b){ 
    if(Date.parse(a.askedOn+' '+ a.askedAt)>Date.parse(b.askedOn+' '+ b.askedAt)){return 1} else{return -1}
  });

  return N;
}

exports.get_search = function(connection1, connection2, e){
    return onkey(connection1, connection2, e);
}

async function sTag(connection1, connection2, searchText){
  let tags = '';
  await Tag.get_all_tag(connection1).then((re) => tags = re);
  let questions = '';
  await Question.get_all_question(connection2).then((re) => questions=re);
  let aSearch = searchText;
  let nSearch = new Array(questions.length).fill(0);
  let sString = aSearch.substring(1, aSearch.length-1);
  for(let j=0; j<tags.length; j++){
    if(tags[j].name == sString){
      let tag = tags[j]._id;
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

  const N=[]
  for(let i=nSearch.length-1; i>=0; i--){
      if(nSearch[i] != 0){
          N.push(questions[i]);
      }
  }

  N.sort(function(a, b){ 
    if(Date.parse(a.askedOn+' '+ a.askedAt)>Date.parse(b.askedOn+' '+ b.askedAt)){return 1} else{return -1}
  });

  return N;
}

exports.get_sTag = function(connection1, connection2, e){
  return sTag(connection1, connection2, e);
}
