const validator = require('validator');

class inputsValidation {
    validateLoginInputs({email, password}) {
        let errors = {};
        email = !this.isEmpty(email) ? email : "";
        password = !this.isEmpty(password) ? password : "";
        //check if the email is valied or empty
        if (!validator.isEmail(email)) errors.email = "email is invalid";
        if (validator.isEmpty(email)) errors.email = "email is required";
        //check on the length of the password and if is empty
        if (!validator.isLength(password, {min: 5, max: 20}))
            errors.password = "password must be between 5 and 20 characters";
        if (validator.isEmpty(password))
            errors.password = "password is required";
        return {
            errors,
            isValid: this.isEmpty(errors),
        }
    };


    isEmpty(value) {
        return value === undefined || value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0);
    }
}


const validation = new inputsValidation();
module.exports = validation;
