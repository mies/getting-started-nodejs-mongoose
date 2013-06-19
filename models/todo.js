var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var todoSchema= new Schema({
  action: String,
  creationDate: {type: Date, 'default': Date.now},
});

module.exports = mongoose.model('Todo', todoSchema);
