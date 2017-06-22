var User = require('../models/User.js');
var LocalStrategy = require('passport-local').Strategy;

var strategyOptions = {
    usernameField: 'email'
};
var email, password;

exports.login = new LocalStrategy(strategyOptions, function(email, password, done) {
    console.log(email);


    User.findOne( { $or: [{email: email}, {username: email}] }, function(err, user) {
        if (err) return done(err);

        if (!user) return done(null, false, { message: 'Wrong email' });

        user.comparePasswords(password, function(err, isMatch) {
            if (err) return done(err);

            if (!isMatch) {
                return done(null, false, { message: 'Wrong password' });
            }
            console.log(user);
            return done(null, user);
        });

    });
});