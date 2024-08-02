const bcrypt = require('bcrypt');
const saltRounds = 10;
let User = require('../models/users');

function get_one_user(email){
    return User.findOne({email: email});
}

exports.get_user = async (email, password) => {
    let user = await get_one_user(email);
    if(user==null){
        return 'null';
    }
    else{
        let hash = user.password
        const match = await bcrypt.compare(password, hash);
        if(match){
            return user;
        }
        else{
            return "Incorrect password"
        }
    }
}

function save_user(u){
    bcrypt.hash(u.password, saltRounds, function(err, hash) {
        u.password = hash;
        let user = new User(u);
        user.save();
    });
}

exports.create_user= async (e) => {
    let user = await get_one_user(e.email);
    if(user==null){
        save_user(e);
        return ;
    }
    else{
        return "This email is already registered!"
    }
}