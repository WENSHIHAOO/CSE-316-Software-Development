var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
      text: {type: String, required: true},
      com_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
      com_date_time: {type: Date, default: Date.now},
    }
);

CommentSchema
.virtual('url')
.get(function () {
  return 'posts/comment/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);