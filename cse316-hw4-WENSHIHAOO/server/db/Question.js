// Question-related Queries

get_qt= function(connection){
    let get_tid = 'select * from qt;';
    const get_t =[];
    return  new Promise((resolve, reject) => {connection.query(get_tid, function(error, fields, results) {
            if(error) throw error;
            fields.forEach(function(field) {get_t.push({qstnId:field.qstnId, tagId:field.tagId})})
            resolve(get_t);
        });
    })
}

get_qa= function(connection){
    let get_tid = 'select * from qa;';
    const get_a =[];
    return  new Promise((resolve, reject) => {connection.query(get_tid, function(error, fields, results) {
            if(error) throw error;
            fields.forEach(function(field) {get_a.push({qstnId:field.qstnId,  ansId:field. ansId})})
            resolve(get_a);
        });
    })
}

exports.get_all_question = function(connection) {
    connection.connect(); 
    const question=[];
    let get_question = 'select qid, title, text, asked_by, ask_date_time, views from question order by ask_date_time;';
    return new Promise((resolve, reject) => {connection.query(get_question, async function(error, fields, results) {
        if(error) throw error;
        const all_question = new Map();
        let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        fields.forEach(function(field) {
            let date = field.ask_date_time;
            let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
            let ansAt= date.getHours()+":"+date.getMinutes();
            all_question.set(field.qid, {
                _id: field.qid,
                title: field.title,
                text: field.text,
                tagIds: [],
                answers: [],
                askedBy: field.asked_by,
                askedOn: ansdOn,
                askedAt: ansAt,
                views: field.views,
            });
        });

        await get_qa(connection).then((fields) => fields.forEach(function(field) {
            all_question.get(field.qstnId).answers.push(field.ansId);
        }))

        await get_qt(connection).then((fields) => fields.forEach(function(field) {
            all_question.get(field.qstnId).tagIds.push(field.tagId);
        }))

        all_question.forEach(function(q, qid) {
            question.push(q);
        })

        connection.end();
        resolve(question);
    });
    });
}

function all_tag(connection) {
    let get_tid = 'select * from tag;';
    const get_t =[];
    return  new Promise((resolve, reject) => {connection.query(get_tid, function(error, fields, results) {
            if(error) throw error;
            fields.forEach(function(field) {get_t.push({_id:field.tid, name:field.name})})
            resolve(get_t);
        });
    })
}

function tagCreate(connection, name) {
    let tag ={ name: name };
    return  new Promise((resolve, reject) => {connection.query('insert into tag set ?', tag, function(error, results, fields) {
        if(error) throw error;
        resolve(results.insertId);
    })
    })
}

function questionCreate(connection, newQ) {
    let newq = {
        title: newQ.title,
        text: newQ.text,
        asked_by: newQ.asked_by,
    }
    return  new Promise((resolve, reject) => {connection.query('insert into question set ?', newq, function(error, results, fields) {
        if(error) throw error;
        resolve(results.insertId);
    })
    })
}

function qtCreate(connection, qt) {
    connection.query('insert into qt set ?', qt, function(error, results, fields) {
        if(error) throw error;
    })
}

exports.create_question = async function(connection, newQ){
    connection.connect(); 
    let All = [];
    await all_tag(connection).then((re) => All=re);

    for(let j=0; j<newQ.tags.length; j++){
        let tag = false;
        for(let i=0; i<All.length; i++){
          if(All[i].name==newQ.tags[j]){
            newQ.tags[j] = All[i]._id;
            tag = true;
            break;
          }
        }
        
        if(tag){
          continue;
        }

        await tagCreate(connection, newQ.tags[j]).then((re) => newQ.tags[j] = re);
    }

    let qid = ''
    await questionCreate(connection, newQ).then((re) => qid = re);

    for(let i=0; i<newQ.tags.length; i++){
        let qt={
            qstnId: qid,
            tagId: newQ.tags[i],
        }
        qtCreate(connection, qt);
    }

    connection.end();
    return;
}