var mongoose = require('mongoose');

var schema = mongoose.Schema({
  _id:{
    type: Number
  },
  url:{
    type: String
  }
})

var repository = module.exports = mongoose.model('repository', schema);

module.exports.urlCheck = function(criteria, cb){
  repository.find(criteria, cb);
}

module.exports.addUrl = function(criteria){
  repository.create(criteria);
}