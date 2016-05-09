var app = require('../app');
var restful = require('node-restful');
var mongoose = require('mongoose');

module.exports = app.users = restful.model('Users', mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	imdTraject: {
		type: String,
		required: false,
		default: ''
	},
	skill: {
		type: String,
		required: false,
		default: ''
	},
	portfolio: {
		type: String,
		required: false,
		default: ''
	},
	bio: {
		type: String,
		required: false,
		default: ''
	},
    admin: {
        type: Boolean,
        required: true,
        default: 0
    },
    pictures: {
		type: Array,
		required: false,
		default: ''
	}
}));