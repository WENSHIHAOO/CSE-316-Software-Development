let Answer = require('../models/answers')
let Question = require('../models/questions')
let User = require('../models/users')
let Tag = require('../models/tags')
let Comment = require('../models/comments')

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

exports.get_profile = async function(uid){
    let user = await User.findById(uid);
    let user_ans = user.user_ans;
    let user_qus = user.user_qus;
    let user_tag = user.user_tag;

    let ans=[0];
    let qus=[];
    let tag=[];

    let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    for(let i=user_ans.length-1; i>=0; i--){
        let a = await Answer.findById(user_ans[i]);
        let acomments = await get_comment(a.comments);
        let date = a.ans_date_time;
        let ansOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
        let anAt= date.getHours()+":"+date.getMinutes();
        an = {
            _id: a._id,
            text: a.text,
            ansBy: {name: user.name, _id: user._id},
            ansOn: ansOn,
            ansAt: anAt,
            votes: a.votes,
            comments: acomments,
        }
        ans.push(an);
    }

    for(let i=0; i<user_qus.length; i++){
        let q = await Question.findById(user_qus[i]);
        let date = q.ask_date_time;
        let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
        let ansAt= date.getHours()+":"+date.getMinutes();
        q= {
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
            views: q.views,
        }
        qus.push(q)
    }

    for(let i=0; i<user_tag.length; i++){
        let t = await Tag.findById(user_tag[i]);
        tag.push(t)
    }

    let pro = {
        ans: ans,
        qus: qus,
        tag: tag,
    }

    return pro
}