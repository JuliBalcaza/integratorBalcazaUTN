const validator = require('express-validator')
const { body, validationResult } = validator;

const validationRules = [
    body('name')
    .notEmpty()
    .withMessage('Field Name must contain your First Name')
    .isAlpha().withMessage('Field Name must only contain alphanumeric characters')
    .isLength({min:2, max:30})
    .withMessage('This field must contain more than 2 and less than 30'),
    body('lastName')
    .notEmpty()
    .withMessage('This field must contain your Last Name')
    .isLength({min:2})
    .withMessage('This field must contain more than 2 characters'),
    body('email')
    .exists()
    .isEmail()
    .withMessage('Please enter a valid Email'),
    body('password')
    .isLength({min:8})
    .withMessage('Field Password must contain more than 8 characters')
    .isAlphanumeric()
    .withMessage('Field Password must contain alphanumeric characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formData = req.body
            const arrWarnings = errors.array();
            res.render('registerForm', { arrWarnings, formData})
        }else return next();
    }
];

module.exports = validationRules
//export default validationRules;