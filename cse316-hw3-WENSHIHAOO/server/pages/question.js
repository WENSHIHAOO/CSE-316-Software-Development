let Question = require('../models/questions')
let Tag = require('../models/tags')

function get_question () {
    return Question.find({}).sort({'ask_date_time': 1});
}

exports.get_all_question = async () => {
    let qs = await get_question();
    let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return qs.map(function(q){
        let date = q.ask_date_time;
        let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
        let ansAt= date.getHours()+":"+date.getMinutes();
        return {
            _id: q._id,
            title: q.title,
            tagIds: q.tags,
            answers: q.answers,
            askedBy: q.asked_by,
            askedOn: ansdOn,
            askedAt: ansAt,
            views: q.views,
        }
    });
}

function tagCreate(name) {
    let tag = new Tag({ name: name });
    return tag.save();
}

function all_tag() {
    return Tag.find({});
}

exports.create_question = async function(newQ){
    let All = await all_tag();
    for(let j=0; j<newQ.tags.length; j++){
        let tag = false;
        for(let i=0; i<All.length; i++){
          if(All[i].name==newQ.tags[j]){
              tag = true;
              newQ.tags[j] = All[i]._id;
              break;
          }
        }
        
        if(tag){
          continue;
        }
        newQ.tags[j] = await tagCreate(newQ.tags[j]);
    }

    let newq = new Question(newQ);
    newq.save();
    return;
}