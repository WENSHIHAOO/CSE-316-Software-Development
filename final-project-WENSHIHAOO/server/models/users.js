var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        reputation: {type: Number, default:0},
        user_date_time: {type: Date, default: Date.now},
        user_ans: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
        user_qus: [{type: Schema.Types.ObjectId, ref: 'Question'}],
        user_tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    }
);

UserSchema
.virtual('url')
.get(function () {
  return 'posts/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);