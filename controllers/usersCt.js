const securePass = require("../helpers/securePass")
const User = require("../schemas/usersSchema")
const validator = require('express-validator')
//import validator from "express-validator";
const {body, validationResult} = validator;

function getLoginForm(req, res, next) {
  res.render("loginForm")
};


async function sendLoginForm(req, res, next) {
  const { email, pass } = req.body;
  const user = await User.find().where({ email })
  if (!user.length) {
    return res.render("loginForm", { message: "Invalid User or Password" })
  };
  if (await securePass.decrypt(pass, user[0].password)) {
    const usr = {
      id: user[0]._id,
      name: user[0].name,
      lastName: user[0].lastName
    }
    req.session.user = usr
    res.render("mytrips", { user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id })
  } else return res.render("loginForm", { message: "Invalid User or Password" })
};

function getRegisterForm(req, res, next) {
  res.render("registerForm")
};

async function sendRegisterForm(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()){// if it is noy empty, so there are errors
    const formData = req.body;
    const arrWarnings = errors.array();// create a variable with an error array get from errors object the array with messages
    res.render('form', {arrWarnings, formData});// and show errors on the form
  } else {
    const { name, lastName, email, pass } = req.body
    const password = await securePass.encrypt(pass)

    const newUser = new User({
      name, lastName, email, password
    })
    const usr = {
      id: newUser._id,
      name: newUser.name,
      lastName: newUser.lastName
    }
    newUser.save((err) => {
      if (!err) {
        req.session.user = usr
        res.render("mytrips", { user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id })
      } else {
        res.render("registerForm", { message: "There is an existing register using this email" })
      }
    })
  }
};

async function getSettings(req, res) {

  const user = await User.findById(req.session.user.id).lean()
  res.render("editUserForm", { user })
}

async function sendSettings(req, res) {
  try {
    await User.findByIdAndUpdate(req.session.user.id, req.body)
    res.redirect("/mytrips")
  } catch (err) {
    res.render("editUserForm", { message: "Something went wrong, try again" })
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.session.user.id)
    req.session.destroy()
    res.redirect("/")
  } catch (err) {
    res.render("editUserForm", { message: "Something went wrong, try again" })
  }
}

async function validateEmail(req, res) {
  res.send("Validate Email view")
}


function logout(req, res) {
  req.session.destroy()
  res.redirect("/");
}

module.exports = { getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, getSettings, sendSettings, validateEmail, deleteUser, logout }

