var express = require('express');
var User = require('../models/User');
var Notes = require('../models/Note');
var passport = require('passport');
var router = express.Router();

router.post('/register', function (request, response) {
    var human = new User(request.body);
    human.save(function (err, resource) {
        if (err) {
            response.send({ err: "Username/Email already exists" }).status(501);

        } else {
            response.json(resource).status(201);

        }
    });

    console.log(human);


});
router.post('/login', passport.authenticate('local-login'), function (req, res) {
    if (req.user) {
        res.status(200).send(req.user.toJSON());
    } else {
        res.send('Wrong email/password');
    }

});
router.post('/notes', function (request, response) {
    Notes.find({})
        .where('email').equals(request.body.email)
        .exec(function (err, resources) {
            if (err) {
                response.send(err).status(404);
            } else {
                console.log('made it to getallnote');
                response.send(resources).status(200);
            }
        });
});

router.post('/deleteNote', function (request, response) {

    if (request.body._id) {
        Notes.findOne({ _id: request.body._id }, function (err, model) {
            if (err) {
                return;
            }
            model.remove(function (err) {
                console.log('made it to delete note');
               response.send(true).status(200);
            });
        });
    }

});
router.post('/editNote', function (request, response) {

    Notes.findOneAndUpdate({ _id: request.body._id }, {
        $set:
        {
            email: request.body.email,
            title: request.body.title,
            note: request.body.note,
            showButtons: false,
        }
    }, function (err, doc) {
        if (err) {
            response.send(err).status(404);
        } else {
            console.log('made it to edit');
            console.log(doc);
            response.send(doc).status(200);
        }

    });
});
router.post('/addNote', function (request, response) {
    var note = new Notes(request.body);
    note.save(function (err, resource) {
        if (err) {
            response.send({ err: "Email already exists" }).status(501);

        } else {
            console.log('made it to addnote');
            response.json(resource).status(201);

        }
    });


});

module.exports = router;