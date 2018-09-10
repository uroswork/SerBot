/**
 * Helper class we use to validate inputs throughout 
 * the project
 */
export class FormValidator {
    // name is valid if it has anything
    validateName(value: string) {
        return value.length > 0;
    }

    // email regex
    validateMail(value: string) {
        const re = /\S+@\S+\.\S+/;
        return re.test(value);
    }

    // password needs to be at least 8 characters
    validatePassword(value: string) {
        return value.length > 7;
    }
}