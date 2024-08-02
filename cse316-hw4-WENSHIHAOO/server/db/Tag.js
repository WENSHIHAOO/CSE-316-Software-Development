// Tag related queries

exports.get_all_tag = function(connection){
    connection.connect(); 
    let get_tid = 'select * from tag;';
    const get_t =[];
    return  new Promise((resolve, reject) => {connection.query(get_tid, function(error, fields, results) {
            if(error) throw error;
            fields.forEach(function(field) {get_t.push({_id:field.tid, name:field.name})});
            connection.end();
            resolve(get_t);
        });
    })
}