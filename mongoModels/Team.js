var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({


  teamname: {
    type: String,
    trim: true,
    required: true
  },
  teamAdmin: {
    type: String
  },
  adminAvatar: {
    type: String
  },
  adminName: {
    type: String
  },
  description: {
    type: String
  },
  tech: {
    type: String
  },
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]


});

var Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
