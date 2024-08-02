let Question = require('../models/questions')
let Tag = require('../models/tags')
let User = require('../models/users')

function get_all_tag () {
    return Tag.find({});
}
function get_all_question(){
    return Question.find({});
}

async function onkey(searchText){
    let tags = await get_all_tag ();
    let questions = await get_all_question();
    let aSearch = searchText.split(" ");
    let nSearch = new Array(questions.length).fill(0);
    for(let i=0; i<aSearch.length; i++){
    if(aSearch[i].charAt(0)=="[" && aSearch[i].charAt(aSearch[i].length-1)=="]"){
      let sString = aSearch[i].substring(1, aSearch[i].length-1);
      for(let j=0; j<tags.length; j++){
        if(tags[j].name.toLowerCase() == sString.toLowerCase()){
          let tag = tags[j]._id;
          for(let x=0; x<questions.length; x++){
            for(let y=0; y<questions[x].tags.length; y++){
              if(questions[x].tags[y].equals(tag)){
                nSearch[x]++;
                break;
              }
            }
          }
        }
      }
    }
    else{
        for(let j=0; j<questions.length; j++){
          if(questions[j].title.toLowerCase().indexOf(aSearch[i].toLowerCase()) != -1){
            nSearch[j]++;
          }
          if(questions[j].text.toLowerCase().indexOf(aSearch[i].toLowerCase()) != -1){
            nSearch[j]++;
          }
          if(questions[j].summary.toLowerCase().indexOf(aSearch[i].toLowerCase()) != -1){
            nSearch[j]++;
          }
        }
      }
    }

    let N=[]
    for(let i=nSearch.length-1; i>=0; i--){
        if(nSearch[i] != 0){
            N.push(questions[i]);
        }
    }

    N.sort(function(a, b){ 
        if(a.ask_date_time > b.ask_date_time){return 1} else{return -1}
    });

    let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    for(let i=0; i<N.length; i++){
      let user = await User.findById(N[i].asked_by);
      let date = N[i].ask_date_time;
      let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
      let ansAt= date.getHours()+":"+date.getMinutes();
      N[i]= {
          _id: N[i]._id,
          title: N[i].title,
          summary: N[i].summary,
          tagIds: N[i].tags,
          answers: N[i].answers,
          askedBy: {name: user.name, _id: user._id},
          askedOn: ansdOn,
          askedAt: ansAt,
          votes: N[i].votes,
          views: N[i].views,
      }
  }

  return N;
    // return N.map(async function(q){
    //     let user = await User.findById(q.asked_by);
    //     let date = q.ask_date_time;
    //     let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
    //     let ansAt= date.getHours()+":"+date.getMinutes();
    //     return {
    //         _id: q._id,
    //         title: q.title,
    //         summary: q.summary,
    //         tagIds: q.tags,
    //         answers: q.answers,
    //         askedBy: {name: user.name, _id: user._id},
    //         askedOn: ansdOn,
    //         askedAt: ansAt,
    //         votes: q.votes,
    //         views: q.views,
    //     }
    // });
  }

  exports.get_search = function(searchText){
      return onkey(searchText);
  }

  async function sTag(searchText){
    let tags = await get_all_tag ();
    let questions = await get_all_question();
    let aSearch = searchText;
    let nSearch = new Array(questions.length).fill(0);
    let sString = aSearch.substring(1, aSearch.length-1);
    for(let j=0; j<tags.length; j++){
      if(tags[j].name == sString){
        let tag = tags[j]._id;
        for(let x=0; x<questions.length; x++){
          for(let y=0; y<questions[x].tags.length; y++){
            if(questions[x].tags[y].equals(tag)){
              nSearch[x]++;
              break;
            }
          }
        }
  
        break;
      }
    }
  
    let N=[];
    for(let i=nSearch.length-1; i>=0; i--){
        if(nSearch[i] != 0){
            N.push(questions[i]);
        }
    }

    N.sort(function(a, b){ 
        if(a.ask_date_time > b.ask_date_time){return 1} else{return -1}
    });

    let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    for(let i=0; i<N.length; i++){
      let user = await User.findById(N[i].asked_by);
      let date = N[i].ask_date_time;
      let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
      let ansAt= date.getHours()+":"+date.getMinutes();
      N[i]= {
          _id: N[i]._id,
          title: N[i].title,
          summary: N[i].summary,
          tagIds: N[i].tags,
          answers: N[i].answers,
          askedBy: {name: user.name, _id: user._id},
          askedOn: ansdOn,
          askedAt: ansAt,
          votes: N[i].votes,
          views: N[i].views,
      }
    }
    
    return N;


    // return N.map(async function(q){
    //     let user = await User.findById(q.asked_by);
    //     let date = q.ask_date_time;
    //     let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
    //     let ansAt= date.getHours()+":"+date.getMinutes();
    //     return {
    //         _id: q._id,
    //         title: q.title,
    //         summary: q.summary,
    //         tagIds: q.tags,
    //         answers: q.answers,
    //         askedBy: {name: user.name, _id: user._id},
    //         askedOn: ansdOn,
    //         askedAt: ansAt,
    //         votes: q.votes,
    //         views: q.views,
    //     }
    // });
  }
  
  exports.get_sTag = function(searchText){
    return sTag(searchText);
  }
  