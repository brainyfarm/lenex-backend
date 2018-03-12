const maliciousRequest = (res) => {
  return res.status(403).json({
    success: false,
    message: "You are not allowed to do that",
  });
}

const registrationSuccess = (res) => {
  return res.status(201).json({
    success: false,
    message: "Registration Successful. Please check your email address to verify your account",
  })
}

export {
  maliciousRequest,
  registrationSuccess
}
