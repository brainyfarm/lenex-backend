import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;


const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  return re.test(email)
};

const User = new Schema({
  firstname: {
    type: String,
    min: [2, 'Firstname too short'],
    max: [24, 'Firstname too long'],
    required: [true, 'Firstname is required']
  },
  lastname: {
    type: String,
    min: [2, 'Lastname too short'],
    max: [24, 'Lastname too long'],
    required: [true, 'Lastname is required']
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    min: [4, 'username too short'],
    max: [8, 'username too long'],
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    min: [6, 'Password too short'],
    max: [40, 'Password too long'],
    required: [true, 'Please provide a password']
  },
  token: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  country: {
    type: String,
    trim: true,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  ipAddress: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now()
  },
  last_login: {
    type: Date,
    default: Date.now()
  }
});

User.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(8, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

export default mongoose.model('User', User);