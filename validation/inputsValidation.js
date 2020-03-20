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

    validateAuthorInputs({dateOfBirth, firstName, lastName}) {
        let errors = {};
        firstName = !this.isEmpty(firstName) ? firstName : "";
        lastName = !this.isEmpty(lastName) ? lastName : "";
        // dateOfBirth = !this.isEmpty(dateOfBirth) ? dateOfBirth : "";
        if (!validator.isLength(firstName, {min: 3, max: 15}))
            errors.firstName = "first name must be between 3 and 5 characters";
        if (!validator.isLength(lastName, {min: 3, max: 15}))
            errors.lastName = "last name must be between 3 and 5 characters";
        // if (!validator.isLength(dateOfBirth, {min: 10, max: 100}))
        //     errors.dateOfBirth = "date of birth must be between 10 and 100 chrachters";
        return {
            errors,
            isValid: this.isEmpty(errors),
        }
    }

    validateCategoryInputs(name) {
        let errors = {}
        name = !this.isEmpty(name) ? name : "";
        if (!validator.isLength(name, {min: 3, max: 25}))
            errors.name = "name must be between 3 and 25 characters";
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
