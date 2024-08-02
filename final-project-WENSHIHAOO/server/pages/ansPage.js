let Question = require('../models/questions')
let Answer = require('../models/answers')
let Comment = require('../models/comments')
let User = require('../models/users')

async function get_comment(cId){
    const C=[];
    for(let i=0; i<cId.length; i++){
        let acomments = await Comment.findById(cId[i]);
        let cuser = await User.findById(acomments.com_by);
        let comment = {
            text: acomments.text,
            com_by: {name: cuser.name, _id: cuser._id},
            com_date_time: acomments.com_date_time,
        }
        C.push(comment)
    }
    return C;
}

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
    let qcomments = await get_comment(q.comments);
    let user = await User.findById(q.asked_by);
    q = {
        _id: q._id,
        title: q.title,
        summary: q.summary,
        text: q.text,
        tagIds: q.tags,
        answers: q.answers,
        askedBy: {name: user.name, _id: user._id},
        askedOn: ansdOn,
        askedAt: ansAt,
        votes: q.votes,
        views: v, 
        comments: qcomments,
    }
    
    const qa = [];
    for(let i=0; i<q.answers.length; i++){
        qa.push(await Answer.findById(q.answers[i]))
    }

    qa.sort(function(a, b){ 
        if(a.ans_date_time > b.ans_date_time){return -1} else{return 1}
    });

    const qAns =[q];

    for(let i=0; i<qa.length; i++){
        let ans = qa[i]
        let acomments = await get_comment(ans.comments);
        let user = await User.findById(ans.ans_by);
        let date = ans.ans_date_time;
        let ansOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
        let anAt= date.getHours()+":"+date.getMinutes();
        an = {
            _id: ans._id,
            text: ans.text,
            ansBy: {name: user.name, _id: user._id},
            ansOn: ansOn,
            ansAt: anAt,
            votes: ans.votes,
            comments: acomments,
        }
        qAns.push(an);
    }

    return qAns;
}

exports.get_ansPage = function(qId){
    return get_ansText(qId);
}


exports.qVote = async function(qid, addOrMinus){
    let q = await Question.findById(qid);
    let v= q.votes;
    if(addOrMinus==0){
        v--;
        await Question.updateOne(
        {"_id": qid},
        {$set: {"votes": v}})
    }
    else{
        v++;
        await Question.updateOne(
        {"_id": qid},
        {$set: {"votes": v}})
    }

    let user = await User.findById(q.asked_by);
    let uv = user.reputation;
    if(addOrMinus==0){
        uv=uv-10;
        await User.updateOne(
        {"_id": q.asked_by},
        {$set: {"reputation": uv}})
    }
    else{
        uv=uv+5;
        await User.updateOne(
        {"_id": q.asked_by},
        {$set: {"reputation": uv}})
    }
    return;
}

exports.aVote= async function(aid, addOrMinus){
    let a = await Answer.findById(aid);
    let v= a.votes;
    if(addOrMinus==0){
        v--;
        await Answer.updateOne(
        {"_id": aid},
        {$set: {"votes": v}})
    }
    else{
        v++;
        await Answer.updateOne(
        {"_id": aid},
        {$set: {"votes": v}})
    }

    let user = await User.findById(a.ans_by);
    let uv = user.reputation;
    if(addOrMinus==0){
        uv=uv-10;
        await User.updateOne(
        {"_id": a.ans_by},
        {$set: {"reputation": uv}})
    }
    else{
        uv=uv+5;
        await User.updateOne(
        {"_id": a.ans_by},
        {$set: {"reputation": uv}})
    }
    return
}

exports.creat_Q_comment= async function(qid, newC){
    let newc = new Comment(newC);
    let c = await newc.save();

    let Q = await Question.findById(qid);
    let comments = Q.comments;
    comments.push(c._id);
    await Question.updateOne(
    {"_id": qid},
    {$set: {"comments": comments}})
    return;
}

exports.creat_A_comment= async function(aid, newC){
    let newc = new Comment(newC);
    let c = await newc.save();

    let A = await Answer.findById(aid);
    let comments = A.comments;
    comments.push(c._id);
    await Answer.updateOne(
    {"_id": aid},
    {$set: {"comments": comments}})
    return;
}