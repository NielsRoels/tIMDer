var app = require('../app');
var restful = require('node-restful');
var mongoose = require('mongoose');

module.exports = app.dates = restful.model('Dates', mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    }
}));