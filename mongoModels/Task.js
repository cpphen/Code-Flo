var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  task: String,
  projectID: Schema.ObjectId

});

var Task = mongoose.model('Task', TodoSchema);

module.exports = Task;
