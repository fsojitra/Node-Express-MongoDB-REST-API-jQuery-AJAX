var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	unique_id: Number,
	username: String,
	fullname: String,
	age: String
}),
User = mongoose.model('user', userSchema);

module.exports = User;