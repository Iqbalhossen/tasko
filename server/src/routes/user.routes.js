const express = require("express");
const route = express.Router();

const {UserLogin, UserSignup, UserLogout, UserView, UserForgotPassword, UserForgotPasswordTokenVerify, UserResetPassword } = require("../controllers/user.controller");

const {
  userLoginValidationRules,
  UserSignupValidationRules,
  UserForgotPasswordValidationRules,
  UserResetPasswordValidationRules,
} = require("./../middlewares/Validation/AuthValidationRules/AuthValidationRules");

const {
  ValidateResults,
} = require("./../middlewares/Validation/ValidateResults/ValidateResults");



const { protect } = require('./../middlewares/auth.middleware');

route.post("/login", userLoginValidationRules(), ValidateResults, UserLogin);
route.post("/signup", UserSignupValidationRules(), ValidateResults, UserSignup);
route.post("/logout",  UserLogout);


route.get("/view", protect, UserView);

// reset password 
route.post("/forgot-password", UserForgotPasswordValidationRules(), ValidateResults, UserForgotPassword);
route.get("/forgot-password/token/verify",  UserForgotPasswordTokenVerify);
route.post("/reset-password", UserResetPasswordValidationRules(), ValidateResults,  UserResetPassword);

module.exports = route;
