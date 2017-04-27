var express = require('express');
var router = express.Router();
var Task = require('../mongoModels/Task.js');
var monUser = require('../mongoModels/User')
var path = require('path');

//Passport JS Set-up
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//MySQL database set-up
var db = require('../models');
var Team = require('../mongoModels/Team.js')
// var User = require('../mongoModels/User.js')

//Sendgrid set-up
// var email = require('../mail/email');

router.get('/checkssion', function(req, res){
  console.log("CHECK SESSION ID IN EXPRESS", req.session.userID);
  res.json({ sessionUserId: req.session.userID, sessionUserInfo: req.session.userData })
})

router.post('/assignTask', function(req, res) {
  console.log("\n");
  console.log("ASSIGN TASK REQ BODY", req.body);

  var taskOBJ = {
    task: req.body.task,
    projectID: req.body.projectID
  }

  var newTask = new Task(taskOBJ);

  newTask.save(function(err, doc){
    if(err){
      console.log(err)
      res.send("Status" + err)
    }else{
      console.log("DOCS AFTER TASK SAVE", doc)

      monUser.findOneAndUpdate({ "_id": req.body.userID }, { $push: {"task": doc._id} }).exec(function(err, doc){
        console.log("DOCS IN USER UPDATE", doc)
        res.json(doc);
      });
    }
  });
});

router.get('/populate-tasks/:pID/:uID', function(req, res){
  console.log("REQ PARAMS pID TASK POPULATE", req.params.pID)
  console.log("REQ PARAMS uID TASK POPULATE", req.params.uID)
  var query = { task: { $elemMatch: { projectID: req.params.pID }}}
  monUser.findById({ "_id": req.params.uID }).populate({path: 'task', match: { projectID: req.params.pID } }).exec(function(err, docs){
    console.log("POPULATE TASKS DOCS", docs)
    res.json(docs);
  })
})

router.post('/register', function(req, res){

  // console.log("REGISTER REQ.BODY", req.body);

  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  //Using express validator*************************************************************************


  req.checkBody('name', 'Must type in name.').notEmpty();
  req.checkBody('username', 'Must type in Username.').notEmpty();
  req.checkBody('email', 'Must type in email.').notEmpty();
  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('password', 'Must type in password.').notEmpty();
  req.checkBody('password2', 'Passwords do not match.').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    console.log("FLASH ERRORS", errors)
    res.json(errors);
  }else{

    // db.users.findOne({
    //   where: {
    //     username: username
    //   }
    // }).then(function(data){
    //   // console.log("DATA USER NAME", data.username)
    //   if(data){
    //     console.log("INSIDE USERNAME VALIDATION")

    //     var taken = "Username in use. Please choose another.";

    //     res.json(taken);
    //   }else{


        db.users.create(req.body).then(function(user){
          // console.log("UUUSSSSSSSSSSSSSSSER", user)
          // req.session.userID = user.id;
          console.log('\n\n')
          // console.log("POST REGISTER CALL BACK FUNCTION DATA", data);
          monUser.create({ name: user.name, username: user.username, skills: user.skills, SQLid: user.id }, function (err, doc){
            console.log("DOCS AFTER CREATE", doc);
            req.session.userID = doc._id;
            req.session.userData = doc;

            res.json({user: doc, sessionUserId: req.session.userID, sessionInfo: req.session.userData});
          });

        });
  }

});


router.post('/updatemember/:userid/:teamid', function(req, res) {
  var obj = {};
  var userid = req.params.userid;
  var teamid = req.params.teamid;
  console.log("controller router post update team member", userid, teamid);

  monUser.findOneAndUpdate({ "_id": userid}, {$push: {"team": teamid}})
    .exec(function(err, doc) {
      console.log("exec. doc=", doc);
      console.log("obj from monUser query", obj);
      obj.userTeam = doc;
      Team.findOneAndUpdate({ "_id": teamid}, {$push: {"teamMembers": userid}})
        .exec(function(err, doc) {
          console.log(doc);
          console.log("obj from Team query", obj);
          obj.teamUser= doc;
          res.json(obj);
        });
    });
});

router.get('/profile-two/:id', function(req, res){
  console.log("PROFILE TWO REQ PARAMS", req.params.id)

  monUser.findById({ "_id": req.params.id}, function(err, doc){
    console.log("PROFILE TWO DOCS", doc);

    if(err){
      console.log(err);
    }else{
      res.json(doc)
    }

  });
});

router.get('/populate', function(req, res) {
    //  var obj = {};

     Team.find({})
     .populate("teamMembers")
     .exec(function(err, doc) {
         if (err) {
           console.log(err)

         } else {
           console.log("\n\nPOPULATE DOC",doc);
           res.json(doc);
         }
      })
})





// for searchform
router.get('/register/:query', function(req,res) {
  console.log('running get: register');
  var query = req.params.query;

  console.log("hi",query);

    monUser.find({"username" : {$regex : ".*"+query+".*"}}
    , function(err, docs) {
      console.log(docs);
      res.json(docs);

    });
});


router.get('/getteaminfo/:id', function(req,res) {
  var id = req.params.id;
  console.log('controller: getting details for team:' + id );

  var teamDetails = {};

  Team.findById({"_id": id}).populate("teamMembers").exec(function(err, docs) {
    console.log("PROJECT DETAILS DOCS", docs);
    teamDetails.teamInfo = docs;

      monUser.findById({"_id": docs.teamAdmin }, function(err, docs) {
        teamDetails.admin = docs.username;
        console.log("ADMIN SEARCH IN TEAM DETAILS", docs)
        console.log("TEAM DETAILS OBJECT", teamDetails);

        res.json(teamDetails)
      });
  });
});





router.get('/register/users', function(req,res) {
   db.users.find(
      {
         where: {
         username: {$ne: null}
      }
   }).then(function(data) {
      console.log('AXIOS GET FOR /register/users');
      console.log(data);

      res.json(data);
   })
})

router.post('/teams', function(req, res){

// TODO: validation for team creation

    var teamInfo = {

      teamname: req.body.teamname,
      description: req.body.description,
      tech: req.body.tech,
      teamAdmin: req.body.userID,
      adminAvatar: req.body.avatar,
      adminName: req.body.adminUsername,

    };

    console.log("ADMIN ID", req.body.userID)

    var obj = {};

    var entry = new Team(teamInfo);
    entry.save(function(err, doc){
      if (err) {
         console.log(err);
      } else {
         console.log("NEW TEAM CREATION DOCS", doc);
         // res.json(doc);
         obj.newTeam = doc;

         monUser.findOneAndUpdate({ "_id": req.body.userID }, { $push: { "adminTeams": doc._id } }).exec(function(err, doc){
          console.log("DOC IN PUSH TO ADMIN TEAMS", doc)
          res.json(obj);
         });


      }

   });
});

router.get('/teams', function(req, res){
console.log("getting to the controller get Teams");
  Team.find({}).exec(function(err, docs) {
    console.log(docs);
    res.json(docs)
  });



});

router.post('/login',
  passport.authenticate('local'), function(req, res) {
    console.log("REQ USER AFTER LOG IN", req.user.dataValues.id)

    monUser.findOne({ SQLid: req.user.dataValues.id }, function(err, doc){
      if(err){
        console.log(err)
      }else{
        req.session.userID = doc._id;
        req.session.userData = doc;
        console.log("DOCS IN LOGIN ROUTE", doc)
        res.json({sessionUserId: req.session.userID, sessionInfo: req.session.userData})
      }
    })
});

// TODO: set the sockID to a store variable
// router.post('/injectSock', function(req,res) {
//   monUser.findOneAndUpdate({ _id: req.body.seshID },
//   function(err, doc) {
//     if(err) {
//       console.log(err);
//     } else {
//
//     }
//   })
// })

router.get('/logout', function(req, res){
  console.log("SESSION OBJECT BEFORE DESRTOY", req.session)
  console.log("SESSION OBJECT BEFORE DESRTOY", req.session.userID)
  req.logOut();

  req.session.destroy(function(err){
    console.log("SESSION OBJECT AFTER DESRTOY", req.session)
    // console.log("SESSION OBJECT AFTER DESRTOY", req.session.userID)
    res.send(false);

  });

});

router.post('/savepic/:id', function(req, res){
  console.log("REQ PARAMS", req.params.id)
  console.log("REQ BODY", req.body.avatarURL)
  monUser.findOneAndUpdate({ "_id": req.params.id}, { "avatar": req.body.avatarURL }, { "new": true }).populate("adminTeams").exec(function(err, doc){
    if(err){
      console.log(err);
    }else{
      console.log("\n\n")
      console.log("SAVE PIC DOCS", doc)
      console.log("\n\n")

      if(doc.adminTeams.length > 0){
        for(var x = 0; x < doc.adminTeams.length; x++){
          Team.findOneAndUpdate({ "_id": doc.adminTeams[x]._id}, { "adminAvatar": doc.avatar }, { "new": true }).exec(function(err, doc){
            if(err){
              console.log(err)
            }else{
              console.log("\n\n")
              console.log("UPDATE TEAM ADMIN AVATAR DOC", doc)
            }
          })
        }
      }
      req.session.userID = doc._id;
      req.session.userData = doc;
      res.json({sessionUserId: req.session.userID, sessionInfo: req.session.userData})
    }
  });
});

router.post('/avatar-projectlist', function(req, res){
  console.log("REQ BODY AVATAR PROJECT LIST", req.body);
  console.log("AVATAR REQ BODY", req.body.avatar);
  Team.findOneAndUpdate({ "_id": req.body.id }, { "adminAvatar": req.body.avatar}, { "new": true }).exec(function(err, doc){
    res.json(doc);
  })
})

// router.post('/edit/username', function(req, res){


// })

router.get('*', function(req,res) {

  res.sendFile(path.join(__dirname + "/..", "public", "index.html"));

});


module.exports = router;
