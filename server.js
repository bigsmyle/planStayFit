var express = require('express'),
    path = require('path'),
    fs = require('fs');
    var database = require('./config/database');
var port =( process.env.PORT || 8080); // set the port
var localStrategy = require('./routes/localStrategy.js');
var express= require('express');
var mongoose = require('mongoose');
var path= require('path');
var bodyParser = require('body-parser');
var passport = require('passport');

mongoose.connect(database.remoteUrl, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

var app = express();
var staticRoot = __dirname + '/dist/';  
app.set('port', (process.env.PORT || 3000));
app.use(express.static(staticRoot));



// app.use(express.static(path.join(__dirname, '/dist')));
app.set('views', path.join(__dirname , '/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use('local-login', localStrategy.login);

var localStrategy = require('./routes/localStrategy.js');
var index = require ('./routes/index');
var routes = require ('./routes/routes');

app.use('/',index);
app.use('/', routes);



app.use(function(req, res, next){
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html'){
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }
    fs.createReadStream(staticRoot + 'index.html').pipe(res);
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 8080");
    }
});