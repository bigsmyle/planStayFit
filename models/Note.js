var mongoose = require('mongoose');


var Notes = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
showButtons: {
        type: Boolean,
        required: true
    }

});



module.exports = mongoose.model('Notes', Notes);