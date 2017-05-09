var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var routes = require("./controller/controller.js");
var expressValidator = require("express-validator");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var sockusers = [];
var sockusersAvatar = [];
var sockusersName = [];
// var connections = [];


var db = require("./models");
// Create a new express app
var app = express();

var server = require("http").createServer(app);
var io = require("socket.io")(server);

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));
var session = require("express-session")({
	secret: "DUUUUUUUUUDE",
	resave: false,
	saveUninitialized: true
});

// app.use(session({
// 	secret: "DUUUUUUUUUDE",
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {maxAge: 60000}
// }));

// SOCKET
// var sharedsession = require("express-socket.io-session");
app.use(session);


io.on('connection', function(socket) {

	console.log("connected.", socket.id);
	socket.on('disconnect', function(user) {
  		if (user) {
    		sockusers.splice(sockusers.indexOf(user._id), 1);
    		sockusersAvatar.splice(sockusers.indexOf(user._id), 1);
    		sockusersName.splice(sockusers.indexOf(user._id), 1);
    		console.log('after leaving. sockusers:%s', sockusers);
    		io.emit('sockusers', sockusers, sockusersAvatar, sockusersName);
    	}
  });

	socket.on('chat opened', function(user) {
		console.log('Chat was entered by %s', user._id);
		socket.join('lobby');
		sockusers.push(user._id)
		if(user.avatar) {
			sockusersAvatar.push(user.avatar)

		} else if (user.avatar == null) {
			sockusersAvatar.push('http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg');
		}
		sockusersName.push(user.name)
		console.log('after joining. sockusers:%s', sockusers);

	});
	socket.on('chat closed', function(user) {
		socket.leave('lobby');
		console.log('Chat was closed by %s', user._id);
		sockusers.splice(sockusers.indexOf(user._id), 1);
		sockusersAvatar.splice(sockusers.indexOf(user._id), 1);
		sockusersName.splice(sockusers.indexOf(user._id), 1);
		console.log('after leaving. sockusers:%s', sockusers);
		io.emit('sockusers', sockusers, sockusersAvatar, sockusersName);
	});

	socket.on('get sockusers', function(data) {
		console.log('getting sockusers');
		console.log('payload: %s', sockusers);
		io.emit('sockusers', sockusers, sockusersAvatar, sockusersName);
	})
	socket.on('new message lobby', function(data) {
			console.log('incoming new message: %s', data);
			socket.broadcast.to(data.room).emit('receive lobby message', data);
			console.log('broadcasting msg to room %s', data.room);
	});
});

var databaseUri = "mongodb://localhost/sampledatabse1020";

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(databaseUri)
}
// MongoDB configuration (Change this URL to your own DB)
var database = mongoose.connection;

database.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

database.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

passport.use(new LocalStrategy(
  function(username, password, done) {

    db.users.findOne({
    	where: {
    		email: username
    	}
    }).then(function(user){
    	if (!user) {
        	return done(null, false, { message: 'Incorrect username.' });
      	}
    	user.passwordVerify(password, user.password, function(err, match){

    		if (err) {
    			done(err);
    		}

    		if (match) {
    			return done(null, user);
    		} else {
    			return done(null, false, {message: 'Invalid Password'});
    		}
    	});
    }).catch(function(err){
    	console.log('failed on passport authentication', err);
    	done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log("user in serializeUser", user);
  console.log("HEEEYYYYYYYY");
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

db.sequelize.sync({ force: false }).then(function() {
	server.listen(PORT, function() {
	  console.log("App listening on PORT: " + PORT);
	});
});
