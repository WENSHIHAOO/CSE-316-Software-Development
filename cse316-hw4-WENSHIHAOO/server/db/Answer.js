// Answer-related queries
function get_one_q(connection, qId){
    return  new Promise((resolve, reject) => {connection.query('select * from question where qid='+qId+';', function(error, fields, results) {
        if(error) throw error;
        resolve(fields);
        });
    })
}

function update_one_q(connection, v, qId){
    connection.query('update question set views='+v+' where qid='+qId+';', function(error, fields, results) {
        if(error) throw error;
    })
    return;
}

function get_aid(connection, qId){
    return  new Promise((resolve, reject) => {connection.query('select * from qa where qstnId='+qId+';', function(error, fields, results) {
        if(error) throw error;
        resolve(fields);
        });
    })
}

function get_one_a(connection, aId){
    return  new Promise((resolve, reject) => {connection.query('select * from answer where aid='+aId+';', function(error, fields, results) {
        if(error) throw error;
        resolve(fields);
        });
    })
}

async function get_ansText(connection, qId){
    connection.connect(); 
    let q = '';
    await get_one_q(connection, qId).then((re) => q=re[0]);
    let v= q.views;
    v++;
    update_one_q(connection, v, qId);
    let month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let date = q.ask_date_time;
    let ansdOn= month[date.getMonth()+1]+" "+date.getDate()+", "+date.getFullYear();
    let ansAt= date.getHours()+":"+date.getMinutes();
    q = {
        _id: q.qid,
        title: q.title,
        text: q.text,
        askedBy: q.asked_by,
        askedOn: ansdOn,
        askedAt: ansAt,
        views: v,  
    }
    
    let aid=[];
    await get_aid(connection, qId).then((re) => aid=re);

    const qa = [];
    for(let i=0; i<aid.length; i++){
        await get_one_a(connection, aid[i].ansId).then((re) => qa.push(re[0]));
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
    connection.end();
    return qAns;
}

exports.get_ansPage = function(connection, qId){
    return get_ansText(connection, qId);
}

exports.create_answer = async function(conn, qid, ans){
    conn.connect(); 
    await conn.query('insert into answer set ?', ans, function(error, results, fields) {
        if(error) {
            conn.end();
            throw error;
        }

        let qa = {
            qstnId: qid,
            ansId: results.insertId
          };

        conn.query('insert into qa set ?', qa, function(error, results, fields) {
            if(error) {
                conn.end();
                throw error;
            }
        })
    })

    let q = '';
    await get_one_q(conn, qid).then((re) => q=re[0]);
    let v= q.views;
    v--;
    update_one_q(conn, v, qid);
    conn.end();

    return;
}