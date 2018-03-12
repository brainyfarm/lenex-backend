const cleanSignup = (data) => {
  delete data.token;
  delete data.isVerified;
  delete data.ipAddress;
  delete data.created;
  return data;
}

const cleanLogin = (data) => {
  return {
    username: data.username.trim(),
    password: data.password,
    email: data.email.trim(),
  }
}

const cleanUserInput = (type, data) => {
  switch(type){
    case 'signup':
      return cleanSignup(data);
      break;
    case 'login':
      break;
    default:
      return data;
  }
}

export default cleanUserInput;
