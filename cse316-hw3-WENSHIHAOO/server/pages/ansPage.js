let Question = require('../models/questions')
let Answer = require('../models/answers')

async function get_ansText(qId){
    let q = await Question.findById(qId);
    let v= q.views;
    v++;
    await Question.updateOne(
        {"_id": qId},
        {$set: {"views": v}},
    )

    let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let date = q.ask_date_time;
    let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
    let ansAt= date.getHours()+":"+date.getMinutes();
    q = {
        _id: q._id,
        title: q.title,
        text: q.text,
        tagIds: q.tags,
        answers: q.answers,
        askedBy: q.asked_by,
        askedOn: ansdOn,
        askedAt: ansAt,
        views: v,  
    }
    
    const qa = [];
    for(let i=0; i<q.answers.length; i++){
        qa.push(await Answer.findById(q.answers[i]))
    }

    qa.sort(function(a, b){ 
        if(a.ans_date_time > b.ans_date_time){return -1} else{return 1}
    });

    const qAns =[q];
    qa.map(function(ans){
        let date = ans.ans_date_time;
        let ansOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
        let anAt= date.getHours()+":"+date.getMinutes();
        an = {
            text: ans.text,
            ansBy: ans.ans_by,
            ansOn: ansOn,
            ansAt: anAt,
        }
        qAns.push(an);
    });

    return qAns;
}

exports.get_ansPage = function(qId){
    return get_ansText(qId);
}