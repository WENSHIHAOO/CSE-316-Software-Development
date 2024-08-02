let Answer = require('../models/answers')
let Question = require('../models/questions')

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
    return;
}