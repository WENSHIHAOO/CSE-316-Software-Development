let Tag = require('../models/tags')

exports.get_all_tag = function() {
    return Tag.find({});
}