let Question = require('../models/questions')
let Tag = require('../models/tags')
let User = require('../models/users')
let Answer = require('../models/answers')
let Comment = require('../models/comments')

function get_question () {
    return Question.find({}).sort({'ask_date_time': 1});
}

exports.get_all_question = async () => {
    let qs = await get_question();
    let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    for(let i=0; i<qs.length; i++){
        let user = await User.findById(qs[i].asked_by);
        let date = qs[i].ask_date_time;
        let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
        let ansAt= date.getHours()+":"+date.getMinutes();
        qs[i]= {
            _id: qs[i]._id,
            title: qs[i].title,
            summary: qs[i].summary,
            tagIds: qs[i].tags,
            answers: qs[i].answers,
            askedBy: {name: user.name, _id: user._id},
            askedOn: ansdOn,
            askedAt: ansAt,
            votes: qs[i].votes,
            views: qs[i].views,
        }
    }
    // qs.map(function(q){
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

    return qs;
}

function tagCreate(name) {
    let tag = new Tag({ name: name });
    return tag.save();
}

function all_tag() {
    return Tag.find({});
}

exports.create_question = async function(newQ, uid){
    let All = await all_tag();
    let user = await User.findById(uid);
    let uq = user.user_qus;
    let ut = user.user_tag;

    let tags=[]
    for(let j=0; j<newQ.tags.length; j++){
        let tag = false;
        for(let i=0; i<All.length; i++){
          if(All[i].name==newQ.tags[j]){
              tag = true;
              tags.push(All[i]._id);
              break;
          }
        }
        
        if(tag){
          continue;
        }

        let tagid = await tagCreate(newQ.tags[j]);

        ut.push(tagid);
        tags.push(tagid);
    }
    newQ.tags=tags;
    let newq = new Question(newQ);
    let q = await newq.save();

    await User.updateOne(
        {"_id": uid},
        {$set: {"user_tag": ut}}
    )

    uq.push(q._id);
    await User.updateOne(
    {"_id": uid},
    {$set: {"user_qus": uq}})

    return;
}

exports.QDelete = async function(Qid, Uid){
    let user = await User.findById(Uid);

    let newUqus = [];
    for(let i=0; i<user.user_qus.length; i++){
        if(user.user_qus[i]!=Qid){
            newUqus.push(user.user_qus[i]);
        }
    }
    await User.updateOne(
        {"_id": Uid},
        {$set: {"user_qus": newUqus}}
    )

    let q = await Question.findById(Qid);
    for(let i=0; i<q.comments.length; i++){
        Comment.deleteOne({_id: q.comments[i]});
    }

    await Question.deleteOne({_id: Qid});
    return;
}

exports.QEdit = async function(qid, e, uid){
    let title = e.title;
    let summary = e.summary;
    let text = e.text;
    let tags = [];

    let All = await all_tag();
    let user = await User.findById(uid);
    let ut = user.user_tag;

    for(let j=0; j<e.tags.length; j++){
        let tag = false;
        for(let i=0; i<All.length; i++){
          if(All[i].name==e.tags[j]){
              tag = true;
              tags.push(All[i]._id);
              break;
          }
        }
        
        if(tag){
          continue;
        }

        let tagid = await tagCreate(e.tags[j]);

        ut.push(tagid);
        tags.push(tagid);
    }

    await User.updateOne(
        {"_id": uid},
        {$set: {"user_tag": ut}}
    )

    await Question.updateOne(
        {"_id": qid},
        {$set: {"tags": tags, "text":text, "summary":summary, "title":title}}
    )
    return;
}