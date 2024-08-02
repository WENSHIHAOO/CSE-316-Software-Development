let Answer = require('../models/answers')
let Question = require('../models/questions')
let User = require('../models/users')
let Comment = require('../models/comments')

function save_answer(ans){
    let answer = new Answer(ans);
    return answer.save();
}

exports.create_answer = async function(qId,ans){
    let ansId = await save_answer(ans);
    let q = await Question.findById(qId);
    let qAns = q.answers;
    let views = q.views;
    views--;
    qAns.push(ansId);
    await Question.updateOne(
        {"_id": qId},
        {$set: {"answers": qAns, "views": views}},
    )

    let user = await User.findById(q.asked_by);
    let ua = user.user_ans;
    ua.push(ansId);
    await User.updateOne(
    {"_id": q.asked_by},
    {$set: {"user_ans": ua}})
    return;
}

exports.AEdit= async function(aid, e){
    await Answer.updateOne(
        {"_id": aid},
        {$set: {"text": e}}
    )
    return;
}

exports.ADelete= async function(Aid, Uid){
    let Qustions = await Question.find({});
    let find = false;
    let Q = 0;
    for(let i=0; i<Qustions.length; i++){
        for(let j=0;  j<Qustions[i].answers.length; j++){
            if(Qustions[i].answers[j] == Aid){
                find = true;
                Q=Qustions[i];
                break;
            }
        }
        if(find){
            break;
        }
    }

    if(find){
        let newQans =[];
        for(let i=0; i<Q.answers.length; i++){
            if(Q.answers[i] != Aid){
                newQans.push(Q.answers[i])
            }
        }
        await Question.updateOne(
            {"_id": Q._id},
            {$set: {"answers": newQans}}
        )
    }

    let user = await User.findById(Uid);
    let newUans = [];
    for(let i=0; i<user.user_ans.length; i++){
        if(user.user_ans[i] != Aid){
            newUans.push(user.user_ans[i])
        }
    }
    await User.updateOne(
        {"_id": Uid},
        {$set: {"user_ans": newUans}}
    )

    let ans = await Answer.findById(Aid);
    let com = ans.comments;
    for(let i=0; i<com.length; i++){
        await Comment.deleteOne({_id: com[i]});
    }

    await Answer.deleteOne({_id: Aid});
    return;
}