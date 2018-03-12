import bcrypt from 'bcrypt-nodejs';
import User from '../models/User';

import cleanUserInput from '../helpers/sanitize_request/Index'
import * as Reply from '../helpers/response/User';

const home = (req, res) => {
  return res.status(200)
    .json({
      success: true,
      message: "Lenex User API",
    })
}
const register = (req, res) => {
  const ipAddress = req.ip;
  const userInput = req.body;

  console.log(userInput);
  console.log(req.ip);
  /** Sanitize input before processing **/
    const newUser = new User({ 
      ...cleanUserInput('signup', userInput),
      ipAddress,
    });
  
  return newUser.save((err, user) => {
    if(err){
      console.log(err);
      return res.status(400)
        .json({
          success: false,
          message: err.message,
        });
    }
    return Reply.registrationSuccess(res);
  }); 
};


const login = (req, res) => {
  return res.status(200)
    .json({
      message: 'Login to Lenex',
    });
}


export {
  register,
  login,
  home,
}