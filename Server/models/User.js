const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fName: {
      type: String,
      required: true
    },
    mName: {
      type: String,
    },
    lName: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    birthDate: {
      type: Date
    },
    manager: {
      type: String
    }
  });

  module.exports = User = mongoose.model('user', UserSchema);