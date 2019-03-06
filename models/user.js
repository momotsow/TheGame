var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    AvarterName: {
      type: String,
      required: false,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
});
// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          callback(error);
        } else if ( !user ) {
          res.send('User not found.');
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            callback(null, user);
          } else {
            callback();
          }
        })
      });
}
// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
        res.send('Error could not encrypt');
    }
    user.password = hash;
    next();
  })
});
var User = mongoose.model('User', UserSchema);

module.exports = User;
