const router = require('express').Router()
const users = require("../controllers/usersCt")
const auth = require("../helpers/auth")
//import validationRules from ("../validators/validation-rules")
const validationRules = require('../validators/validation-rules')

router.get("/login", users.getLoginForm)
router.post("/login", users.sendLoginForm)
router.get("/register", users.getRegisterForm)
router.post("/register", validationRules, users.sendRegisterForm)
router.get("/logout", users.logout)
router.get("/settings", auth, users.getSettings)
router.post("/settings", auth, users.sendSettings)
router.get("/validate", auth, users.validateEmail)
router.get("/delete", auth, users.deleteUser)

module.exports = router;