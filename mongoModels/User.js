var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "First Name is Required"
  },
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  skills: {
    type: String,
    trim : true
  },
  avatar: {
    type: String
  },
  SQLid: {
    type: Number
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date
  },

  userAdmin: {
    default: false
  },
  adminTeams: [{
    type: Schema.Types.ObjectId,
    ref: "Team"
  }],
  team: [{
    type: Schema.Types.ObjectId,
    ref: "Team"
  }],

  //had to move the projectID property that was originally in here to the Task model and then use populate->
    //path/match. This Will match all tasks in the Task model that has the property projectID equal to the id in req.params.pID,
    //and pull those out.
  task: [{

      type: Schema.Types.ObjectId,
      ref: "Task"
  }]
});

var User = mongoose.model("User", UserSchema);

// Export the model so the server can use it
module.exports = User;
