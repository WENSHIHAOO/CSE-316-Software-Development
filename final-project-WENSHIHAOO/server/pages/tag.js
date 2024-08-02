let Tag = require('../models/tags')
let User = require('../models/users')

exports.get_all_tag = function() {
    return Tag.find({});
}

exports.TDelete= async function(tid, i, uid){
    let user = await User.findById(uid);
    let userTags = user.user_tag;
    let newTags = [];
    for(let j=0; j<userTags.length; j++){
        if(j!=i){
            newTags.push(userTags[j]);
        }
    }

    await User.updateOne(
        {"_id": uid},
        {$set: {"user_tag": newTags}}
    )

    await Tag.deleteOne({_id: tid})
    return;
}

exports.TEdit= async function(tid, e, i, uid){
    let tags = await Tag.find({});

    let newTag=true;
    for(let i=0; i<tags.length; i++){
        if(tags[i].name==e && tags[i]._id!=tid){
            newTag=false;
            break;
        }
    }

    if(newTag){
        await Tag.updateOne(
            {"_id": tid},
            {$set: {"name": e}}
        )
    }
    else{
        let user = await User.findById(uid);
        let userTags = user.user_tag;
        let newTags = [];
        for(let j=0; j<userTags.length; j++){
            if(j!=i){
                newTags.push(userTags[j]);
            }
        }

        await User.updateOne(
            {"_id": uid},
            {$set: {"user_tag": newTags}}
        )

        await Tag.deleteOne({_id: tid})
    }
    return;
}